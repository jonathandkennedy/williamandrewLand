# Images

## `will-andrews.jpg` — the headshot

Drop the attorney headshot here as `will-andrews.jpg` (or `.jpeg`, `.png`,
`.webp`). The build detects it automatically and wires it into the
"Who you are calling" block on every page — no config change needed.

Until the file exists, that block renders without a face and the build prints
a warning.

**Requirements**

- Square crop, head and shoulders. It renders at 108px on mobile and 128px on
  desktop, so anything wider gets cropped to the centre.
- At least 256px on the short edge so it stays sharp on a 2x screen.
- Under ~150KB. It is the only image on these pages and it loads lazily, but
  paid mobile traffic is often on cellular.

**Where it does not go:** behind the headline. The whole reason these pages
exist is that the old ones spent the mobile fold on a portrait. The photo is
a trust asset that belongs *after* the first call-to-action, once someone has
decided to keep reading.
