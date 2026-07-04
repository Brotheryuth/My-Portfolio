import React from 'react';

function MessagesTab({ messages }) {
  return (
    <div className="tab-pane">
      <div className="tab-pane-header">
        <h2>Inbox Messages</h2>
      </div>

      <div className="messages-list">
        {messages.length === 0 ? (
          <p className="no-messages">Your inbox is empty.</p>
        ) : (
          messages.map((msg) => (
            <div key={msg._id} className="message-item-card">
              <div className="msg-header">
                <div>
                  <strong>{msg.name}</strong> 
                  <span className="msg-email"> &lt;{msg.email}&gt;</span>
                </div>
                <span className="msg-date">
                  {msg.createAt ? new Date(msg.createAt).toLocaleDateString() : 'N/A'}
                </span>
              </div>
              <div className="msg-subject">
                Subject: <span>{msg.subject || '(No Subject)'}</span>
              </div>
              <div className="msg-body">
                {msg.message}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MessagesTab;
