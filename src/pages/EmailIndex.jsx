import { AppHeader } from "../cmps/AppHeader";
import { SideBar } from "../cmps/SideBar";
import { Outlet, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { EmailList } from "../cmps/EmailList";
import { emailService } from "../services/email.service";
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service";
import { EmailFilter } from "../cmps/EmailFilter";
import { EmailSort } from "../cmps/EmailSort";

export function EmailIndex() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [emails, setEmails] = useState(null);
  const params = useParams();
  const [searchBy, setSearchBy] = useState(
    emailService.getDefaultSearch(searchParams)
  );

  useEffect(() => {
    setSearchParams(searchBy);
    loadEmail();
  }, [searchBy, params.folder, params.compose, params.id]);

  async function loadEmail() {
    try {
      const emails = await emailService.query(searchBy, params.folder);
      setEmails(emails);
    } catch (error) {
      showErrorMsg("Could Not Loading Emails");
      console.log("error:", error);
    }
  }

  async function onRemoveEmail(emailId) {
    try {
      if (params.folder === "trash") {
        await emailService.remove(emailId);
        showSuccessMsg("Conversation Deleted Forever");
      } else {
        const emailToRemove = await emailService.getById(emailId);
        emailToRemove.removedAt = Date.now();
        await emailService.save(emailToRemove);
        showSuccessMsg("Conversation moved to Trash");
      }
      setEmails((prevEmail) =>
        prevEmail.filter((email) => email.id !== emailId)
      );
    } catch (error) {
      showErrorMsg("Could Not Delete Conversation");
      console.log("error:", error);
    }
  }

  async function onAddEmail(emailToAdd) {
    try {
      const addedEmail = await emailService.save(emailToAdd);
      setEmails((prevEmails) => [...prevEmails, addedEmail]);
      return addedEmail;
    } catch (error) {
      showErrorMsg("Could Not Add Email");
      console.log("error:", error);
    }
  }

  async function onUpdateEmail(mailToUpdate) {
    try {
      const updatedEmail = await emailService.save(mailToUpdate);
      if (updatedEmail.sentAt && params.folder === "draft") {
        setEmails((prevEmails) =>
          prevEmails.filter((email) => email.id !== updatedEmail.id)
        );
        showSuccessMsg('Email Send Successfully')
        return
      }
      setEmails((prevEmails) =>
        prevEmails.map((email) => {
          return email.id === mailToUpdate.id ? updatedEmail : email;
        })
      );
      
      return updatedEmail;
    } catch (error) {
      showErrorMsg("Could Not Update Email");
      console.log("error:", error);
    }
  }

  function onSetSearch(searchBy) {
    setSearchBy((prevSearch) => ({ ...prevSearch, ...searchBy }));
  }

  function onToggleStar(emailId) {
    if (params.folder === "starred") {
      setEmails((prevEmail) =>
        prevEmail.filter((email) => email.id !== emailId)
      );
    }
  }

  const { textSearch, isRead, fieldToSort, sortOrder } = searchBy;

  if (!emails) return <div>Loading...</div>;

  return (
    <section className="mail-app">
      <header>
        <AppHeader searchBy={{ textSearch }} onSetSearch={onSetSearch} />
      </header>
      <aside>
        <SideBar  />
      </aside>
      <section className="main">
        <section className="email-search-bar">
          <EmailFilter searchBy={{ isRead }} onSetSearch={onSetSearch} />
          <EmailSort
            searchBy={{ fieldToSort, sortOrder }}
            onSetSearch={onSetSearch}
          />
        </section>
        {!params.id && (
          <EmailList
            className="emails"
            emails={emails}
            onRemoveEmail={onRemoveEmail}
            onUpdateEmail={onUpdateEmail}
            onToggleStar={onToggleStar}
          />
        )}
        <Outlet context={{ onAddEmail, onUpdateEmail, onRemoveEmail}} />
      </section>
    </section>
  );
}

