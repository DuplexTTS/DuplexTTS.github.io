# DuplexTTS Demo Page

This directory is a self-contained static demo page for DuplexTTS. It presents
the paper title, abstract, and project-resource placeholders first, then offers
six representative audio examples selected from the existing two-listener
evaluation. The selection is editorial; it is not an unseen automatic ranking
pass.

## Selection

- `native-*`: three autonomous-generation dialogues. Both listeners gave
  high scores on channel quality, interaction naturalness, meaningfulness, and
  setting adherence, with no timestamped issue annotation.
- `scripted-english-*`: two English rule-composed dialogues. Both listeners
  gave 4--5 on every applicable dimension and marked no issue segment.
- `scripted-chinese-*`: one Chinese rule-composed dialogue with the same
  criterion. The left channel contains scripted speaker A and side-talk
  speaker C; the right channel contains B.

The page keeps the stereo mix primary. Two independent Wavesurfer instances
render the actual mono A and B WAVs inside a fixed panel on a shared timeline;
the mix is used only for listening. The cards use Wavesurfer's native continuous
waveform renderer rather than the compact bar renderer. Separate A/B tracks are
available for inspection. If a browser cannot decode a waveform, the same card
exposes a native audio fallback.
The route diagram, listening plot, and benchmark result carry the main explanation.
The files in this directory are copies of existing archived WAVs. Source IDs,
scores, route descriptions, and input summaries are in `assets.json` and the
per-example `metadata.json` files. Internal server paths and evaluator records
are intentionally not exposed in the page.

## Local preview

From the repository root:

```bash
python -m http.server 8769 --directory demo
```

Then open <http://127.0.0.1:8769/>. The page has no build step or external
runtime dependency and is suitable for copying into a GitHub Pages repository.
