# Breaking Changes

## [22.1.0] - 2026-06-23

### Speed Dial trigger slot renamed

**Before:**
```html
<hub-speed-dial>
  <hub-btn slot="trigger">+</hub-btn>
  ...
</hub-speed-dial>
```

**After:**
```html
<hub-speed-dial>
  <hub-btn hubTrigger>+</hub-btn>
  ...
</hub-speed-dial>
```

**Migration:** replace `slot="trigger"` with the `hubTrigger` attribute on the trigger element.

---

### `icon` input now expects a CSS class string

`HubSpeedDialItemComponent` and `HubDropdownItemComponent` previously rendered the `icon` input value as raw text content. It now passes the value as a CSS class on an `<i>` element.

**Before (emoji or ligature):**
```html
<hub-speed-dial-item icon="✏️" label="Edit" />
<hub-dropdown-item icon="edit">Edit</hub-dropdown-item>
```

**After (icon-font class, e.g. Font Awesome):**
```html
<hub-speed-dial-item icon="fa-solid fa-pen" label="Edit" />
<hub-dropdown-item icon="fa-solid fa-pen">Edit</hub-dropdown-item>
```

**Migration:** update all `icon` bindings to pass a CSS class string compatible with your icon font. If you use a custom icon font, define the corresponding class.
