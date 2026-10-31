const fs = require('fs');
const path = 'C:\\Users\\RIDWAN\\Documents\\Study\\React-studyflow\\frontend\\src\\pages\\Chat.jsx';
let content = fs.readFileSync(path, 'utf8');

const regex = /\{contextMenuSessionId \? createPortal\([\s\S]*?document\.body\s*\)\s*: null\}/;

const replacement = `          {contextMenuSessionId ? (
            createPortal(
              <div
                className="session-context-menu"
                style={{
                  left: Math.min(contextMenuPosition.x, window.innerWidth - 180),
                  top: Math.min(contextMenuPosition.y, window.innerHeight - 60),
                  position: 'fixed',
                  zIndex: 1000,
                }}
                ref={contextMenuRef}
              >
                <button
                  onClick={() => handleDeleteSession(contextMenuSessionId)}
                  className="context-menu-item text-red-400"
                >
                  <Trash2 size={14} />
                  <span>Delete</span>
                </button>
              </div>,
              document.body
            )
          ) : null}`;

if (regex.test(content)) {
  content = content.replace(regex, replacement);
  fs.writeFileSync(path, content);
  console.log('Fixed');
} else {
  console.log('Pattern not found');
}