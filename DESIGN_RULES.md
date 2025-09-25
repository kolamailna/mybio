# MyBio App Design Rules & Structure Guidelines

## PRIMORDIAL INSTRUCTIONS FOR ALL PAGES

These rules are **MANDATORY** and must be followed for all existing and future pages in the MyBio application. Any deviation from these rules is **STRICTLY FORBIDDEN**.

---

## 1. GLOBAL HTML STRUCTURE

### 1.1 Application Root Container
```html
<div id="application-root">
    <!-- All pages must be contained within this root -->
</div>
```

### 1.2 Page Structure Template
Every page MUST follow this exact structure:

```html
<div class="[page-name]-page" id="[pageId]" style="display: none;">
    
    <!-- MANDATORY: Navigation Header -->
    <div class="nav-header">
        <button class="nav-btn back-btn|close-btn" id="[backBtnId]">Back|Close</button>
        <h1 class="nav-title">[Page Title]</h1>
        <button class="nav-btn [action-btn]" id="[actionBtnId]">[Action]</button>
        <!-- OR -->
        <div class="nav-spacer"></div>
    </div>

    <!-- MANDATORY: Content Section(s) -->
    <div class="[content-section-class]">
        <!-- Page-specific content goes here -->
    </div>
    
    <!-- OPTIONAL: Additional sections as needed -->
    
</div>
```

---

## 2. CSS STRUCTURE RULES

### 2.1 Mobile-First Design (IMMUTABLE)
- **Width**: Pages CANNOT exceed mobile width constraints
- **Responsive**: Must use existing responsive breakpoints
- **Full Screen**: All pages MUST take full screen space
- **Scrollable**: Content sections must be scrollable when needed

### 2.2 Mandatory CSS Classes Structure
```css
/* Page Container - REQUIRED */
.[page-name]-page {
    height: 100%;
    width: 100%;
    background-color: rgb(101, 119, 134);
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
}

/* Navigation Header - REQUIRED */
.nav-header {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    height: 65px;
    background: inherit;
    text-align: center;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 3px;
    color: white;
}

/* Content Sections - REQUIRED */
.[content-section-class] {
    background-color: white;
    z-index: 10;
    flex: 1 1 0%;
    display: flex;
    flex-direction: column;
    min-height: 0px;
    overflow-y: scroll;
    transform: translate3d(0px, 0px, 0px);
    position: relative;
    padding: 10px 16px 0px;
}
```

---

## 3. NAVIGATION RULES

### 3.1 Exit Mechanisms (MANDATORY)
Every page MUST have at least ONE of these exit methods:
1. **Back Button**: `<button class="nav-btn back-btn">Back</button>`
2. **Close Button**: `<button class="nav-btn close-btn">Close</button>`
3. **Swipe Gesture**: Automatic right-swipe to go back (already implemented)

### 3.2 Navigation Button Structure
```html
<!-- Left Navigation -->
<button class="nav-btn back-btn|close-btn" id="[uniqueId]">
    [Back|Close|Cancel]
</button>

<!-- Center Title -->
<h1 class="nav-title">[Page Title]</h1>

<!-- Right Navigation -->
<button class="nav-btn [action-type]-btn" id="[uniqueId]">
    [Save|Done|Add|Edit]
</button>
<!-- OR empty spacer -->
<div class="nav-spacer"></div>
```

---

## 4. ALLOWED CUSTOMIZATIONS

### 4.1 Colors (ALLOWED)
- Background colors can be changed
- Text colors can be modified
- Button colors can be customized
- Gradient backgrounds can be adjusted

### 4.2 Content Elements (ALLOWED)
- **Input boxes**: Can add, modify, style
- **Buttons**: Can add, style, position within content areas
- **Grid layouts**: Can implement for pictures, cards, selections
- **Form elements**: Can add various form controls
- **Cards/Lists**: Can create card layouts for user selections
- **Images/Icons**: Can add and position appropriately

### 4.3 Layout Modifications (ALLOWED)
- Content section internal layout
- Grid systems within content areas
- Flexbox arrangements within sections
- Spacing and padding adjustments
- Font sizes and typography (within mobile constraints)

---

## 5. FORBIDDEN MODIFICATIONS

### 5.1 Structure Changes (FORBIDDEN)
- ❌ Changing the page container structure
- ❌ Removing the navigation header
- ❌ Modifying the mobile-first responsive design
- ❌ Making pages wider than mobile constraints
- ❌ Changing the full-screen page behavior
- ❌ Removing exit mechanisms

### 5.2 Navigation Changes (FORBIDDEN)
- ❌ Removing back/close buttons
- ❌ Changing navigation header height (65px)
- ❌ Modifying the three-section nav layout (left-center-right)
- ❌ Disabling swipe-back functionality

### 5.3 Responsive Behavior (FORBIDDEN)
- ❌ Breaking mobile-first design
- ❌ Making content non-scrollable
- ❌ Exceeding mobile width constraints
- ❌ Changing the application root container behavior

---

## 6. PAGE TYPES & TEMPLATES

### 6.1 Form Pages
```html
<div class="form-page" id="formPage">
    <div class="nav-header">
        <button class="nav-btn back-btn">Back</button>
        <h1 class="nav-title">Form Title</h1>
        <button class="nav-btn save-btn">Save</button>
    </div>
    
    <div class="form-section">
        <!-- Form content here -->
    </div>
</div>
```

### 6.2 Selection Pages
```html
<div class="selection-page" id="selectionPage">
    <div class="nav-header">
        <button class="nav-btn back-btn">Back</button>
        <h1 class="nav-title">Select Item</h1>
        <button class="nav-btn done-btn">Done</button>
    </div>
    
    <div class="selection-section">
        <div class="selection-grid">
            <!-- Grid items here -->
        </div>
    </div>
</div>
```

### 6.3 Settings/Menu Pages
```html
<div class="settings-page" id="settingsPage">
    <div class="nav-header">
        <button class="nav-btn close-btn">Close</button>
        <h1 class="nav-title">Settings</h1>
        <div class="nav-spacer"></div>
    </div>
    
    <div class="settings-section">
        <div class="settings-menu">
            <!-- Menu items here -->
        </div>
    </div>
</div>
```

---

## 7. JAVASCRIPT INTEGRATION RULES

### 7.1 Page Navigation (REQUIRED)
```javascript
// Show page function - MUST be implemented
showPage(pageName) {
    // Hide all pages
    // Show target page
    // Update current page state
}

// Back button handlers - MUST be implemented
document.getElementById('[backBtnId]').addEventListener('click', () => {
    this.showPage('dashboard'); // or previous page
});
```

### 7.2 Touch Gestures (REQUIRED)
- Right swipe to go back MUST be maintained
- Touch gesture handling MUST work on all pages

---

## 8. IMPLEMENTATION CHECKLIST

Before creating or modifying any page, verify:

- [ ] Page follows the mandatory HTML structure
- [ ] Navigation header is present with proper buttons
- [ ] Page takes full screen (height: 100%, width: 100%)
- [ ] Mobile-first responsive design is maintained
- [ ] Exit mechanism is implemented (back/close button + swipe)
- [ ] Content sections are scrollable when needed
- [ ] CSS follows the required class structure
- [ ] JavaScript navigation is properly integrated
- [ ] Page doesn't exceed mobile width constraints
- [ ] All interactive elements are touch-friendly

---

## 9. VIOLATION CONSEQUENCES

Any violation of these rules will result in:
1. **Immediate rejection** of the implementation
2. **Mandatory rewrite** following the rules
3. **No exceptions** - these rules are absolute

---

## 10. EXAMPLES OF CORRECT IMPLEMENTATIONS

Refer to the existing pages as perfect examples:
- `mainDashboard` - Dashboard page structure
- `editProfilePage` - Form page structure  
- `accountSettingsPage` - Settings/menu page structure

These three pages represent the **GOLD STANDARD** for all future implementations.

---

**REMEMBER: These rules ensure consistency, usability, and maintain the mobile-first design philosophy. They are NON-NEGOTIABLE.**