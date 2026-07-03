# Project 50 — CSS Filter Cam

**Difficulty:** med · **Category:** Camera · **Core demo:** ~20 min

## What you're building
A live webcam preview with buttons/sliders that apply real-time visual filters (grayscale, blur, brightness, sepia, hue-rotate), plus a "snap" button that captures a photo with the currently applied filter baked in.

## The 20-minute core (MVP)
- Live webcam preview on the page
- A row of filter buttons (grayscale, sepia, blur, invert, etc.) that instantly change how the preview looks
- At least one slider (e.g. brightness) for an adjustable filter
- A "snap" button that saves the current filtered frame as an image

## How it works (concept — no code)
- **Getting the webcam feed.** `navigator.mediaDevices.getUserMedia({ video: true })` prompts the user for camera permission and resolves to a `MediaStream`; assign it to a `<video>` element's `srcObject` and the browser shows a live feed. Research: `MediaDevices.getUserMedia`, `HTMLMediaElement.srcObject`.
- **Live filters are just CSS, applied by JS.** The CSS `filter` property (e.g. `grayscale(100%)`, `blur(4px)`, `brightness(150%)`, `sepia(80%)`, `hue-rotate(90deg)`) can be applied directly to the `<video>` element, and multiple filters can be chained in one string (e.g. `"grayscale(100%) blur(2px)"`). Clicking a filter button just sets `videoElement.style.filter` to a different string — plain string building, no image processing needed for the live preview. Research: CSS `filter` property, `HTMLElement.style`.
- **Sliders drive filter intensity.** An `<input type="range">` for, say, brightness fires an `input` event as it's dragged; read `.value` and use a template literal to build the filter string dynamically (e.g. `` `brightness(${value}%)` ``), keeping any other active filters combined in the same string. This is template literals + string concatenation, applied live. Research: `<input type="range">`, `input` event.
- **Capturing a filtered photo — the key trick.** Canvas's `drawImage` copies pixels, but it does NOT copy CSS filters applied to the source element by default — however, the canvas 2D context has its own `filter` property that accepts the same CSS filter syntax. So before calling `drawImage(video, 0, 0)`, you set `ctx.filter` to the same string you're using on the video, and the captured frame bakes in the filter. Research: `CanvasRenderingContext2D.filter`, `CanvasRenderingContext2D.drawImage`.
- **Saving the snapped photo.** Same pattern as other canvas projects: `canvas.toDataURL('image/png')` plus a temporary `<a download>` link, or `HTMLCanvasElement.toBlob` for larger images. Research: `HTMLCanvasElement.toDataURL`, `HTMLCanvasElement.toBlob`.
- **Tracking "which filter is active."** Keep a simple variable or small object holding the current filter string(s); update it in each button's `click` handler and re-apply it to both the video style and (at snap time) the canvas context — this is state management using variables/objects you already know, just synced to two different places (preview + capture).

## What you'll use
- HTML/CSS: `<video>` preview styled full-width/rounded, horizontal filter button row, slider controls, responsive stacking
- JavaScript: string/template literal building, conditionals for active filter state, event handlers
- Browser APIs: `getUserMedia`, CSS `filter` property (applied via JS), `CanvasRenderingContext2D.filter`, `drawImage`, `toDataURL`/`toBlob`
- Public API (if any): none

## Design prompt (paste it → get a visual spec sheet → build from it)
Paste the prompt below into an AI/design tool that can output HTML (Claude, ChatGPT, v0, etc.). It returns a **single annotated design-spec sheet** — a picture of the screen with the exact pixel spacing, colors, and font sizes labeled on it, plus a per-component breakdown — so you can read every number and rebuild it yourself in plain HTML/CSS/JS. It's a spec to copy, **not** the finished app.

> Create a single self-contained HTML file that is an **annotated design-spec sheet** (like a Figma redline) for a photo-booth-style webcam app with real-time CSS filters and a snap-to-save button — NOT a working app. Include: (1) a clean static mockup of the main screen with realistic placeholder content (the live camera preview, the horizontally scrollable filter thumbnail row, the brightness slider, the circular shutter snap button); (2) small labeled chips placed on the mockup marking the key spacing and sizes in pixels — padding, gaps, border-radius, main element sizes, and the biggest font size; (3) a **Colors** panel — each color as a swatch + hex code + what it is used for; (4) a **Typography** panel — each text element with its pixel font-size and weight; (5) a **Spacing & sizes** panel — max width, paddings, gaps, and corner radii in px; (6) a **Component-by-component breakdown** where every component (the live camera preview, the horizontally scrollable filter thumbnail row, the brightness slider, the circular shutter snap button) gets its own small card listing all of its specs: width/height, padding, background hex, border and border-radius, and text color + font size + weight — so I can build one component at a time just by reading its card. Use the Manrope font. Make it clean and beginner-friendly so someone who has coded for one month can read the numbers and implement it by looking. Style direction: fun, playful, warm, energetic photo-booth style. Do NOT include any interactivity, JavaScript, or real data — it is a static spec sheet I will read and rebuild by hand.

## Resources
- https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
- https://developer.mozilla.org/en-US/docs/Web/CSS/filter
- https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images
- https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL

## Stretch goals
- Add a filter intensity slider that applies to whichever filter is currently active
- Save a gallery of snapped photos in the page (array of data URLs) with thumbnails
- Add a mirror/flip toggle (`scaleX(-1)` transform)
- Let the user download all snapped photos as a zip (stretch of a stretch — research a client-side zip library)

## Skills it drills
- Strings/template literals, conditionals, objects for state, event handling