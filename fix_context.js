const fs = require('fs');
const path = 'C:\\Users\\RIDWAN\\Documents\\Study\\React-studyflow\\frontend\\src\\pages\\Chat.jsx';
let content = fs.readFileSync(path, 'utf8');

const oldStr = `{/* Session Context Menu (Delete) - Portaled to body for proper positioning */}
          {contextMenuSessionId ? createPortal(
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
          ) : null}`;

const newStr = `{/* Session Context Menu (Delete) - Portaled to body for proper positioning */}
          {contextMenuPortal}`;

if (content.includes(oldStr)) {
  content = content.replace(oldStr, newStr);
  fs.writeFileSync(path, content);
  console.log('Fixed');
} else {
  console.log('Pattern not found');
  // Let's check what's actually there
  const idx = content.indexOf('contextMenuSessionId ? createPortal');
  if (idx >= 0) {
    console.log('Found at:', idx);
    console.log(content.substring(idx, idx + 200));
  }
}