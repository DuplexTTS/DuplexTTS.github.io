# DuplexTTS Demo Page · Design Brief

## Purpose

This page is a paper companion for reviewers, not a product landing page and
not an internal listening spreadsheet. A reader should understand the paper's
object, distinguish the two synthesis routes, and listen to a few representative
cases within one short scan.

## Audience and reading order

1. A reviewer first needs the paper title, authorship state, abstract, and the
   two-route contribution.
2. They then need the corpus scale and the most important reported result.
3. The Examples section should present the audio directly, with 01 visible
   without an extra selection step.
4. Only after listening should they inspect the route distinction and evaluation
   evidence.

## Visual direction

- Editorial research artifact: quiet paper background, dark ink, restrained
  blue/orange accents, thin rules, compact typography.
- Information density over decoration. Use labels, aligned columns, and small
  evidence panels where they make comparison faster.
- Full-width sections and a short sample list; avoid nested cards and marketing
  hero composition.
- No gradients, floating blobs, ornamental illustrations, or generic AI copy.
- The waveform is functional evidence: render each WAV with a waveform component
  inside a fixed, clipped panel, provide a playhead, and let a click seek the
  audio. Keep separate A/B playback as a secondary inspection control.

## Content rules

- Say what the route does, not that it is “powerful”, “seamless”, or “human-like”.
- Every number has a defined unit or denominator.
- Show the stereo mix first; tracks A/B are secondary inspection controls.
- Keep evaluation evidence compact: two-listener means and whether a timestamped
  issue was annotated. Do not expose rater IDs or internal paths.
- Explain route differences in plain language and identify the left/right tracks
  when a listener opens the separate audio.
- Do not imply that six hand-selected examples estimate the full corpus.

## Acceptance checks

- The first viewport identifies DuplexTTS, the paper title, anonymous status, and
  the path to the audio examples.
- The first sample is visible in the Listen section without a selection step.
- Every sample has an actual waveform, working mix player, visible time position,
  and separate track controls. The waveform must stay inside its panel and never
  overlap the sample title or metadata.
- The page works as a static directory on localhost and GitHub Pages.
