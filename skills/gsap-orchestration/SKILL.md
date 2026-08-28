# GSAP Orchestration

## Purpose
Implement motion in a structured way using GSAP so the page remains performant, legible and easy to evolve.

## Use This Skill When
- The LP requires timeline-based animation.
- Scroll-triggered sequencing is needed.
- Motion must be reusable across sections.
- A prototype needs a reliable transition system.

## Recommended Scope
Use GSAP for:
- Hero choreography
- Section reveals
- Sticky storytelling moments
- CTA emphasis
- Controlled parallax

Do not default to GSAP for every hover, every micro-state or trivial UI transitions that CSS handles more simply.

## Implementation Standards
- Centralize common easing, duration and stagger tokens.
- Encapsulate per-section animation logic.
- Clean up timelines and triggers on unmount.
- Avoid animation code mixed directly into visual markup when it starts becoming complex.
- Ensure content remains understandable before animation starts.

## React Guidance
- Keep DOM targeting scoped and explicit.
- Use refs per section instead of broad document queries.
- Build composable animation helpers for repeated patterns.
- Test behavior on mobile before considering the motion complete.

## ScrollTrigger Guidance
- Use scroll triggers to support reading flow, not create novelty for its own sake.
- Be conservative with pinning.
- Avoid overlapping triggers that make tuning difficult.
- Calibrate start and end points against actual content rhythm.

## Performance Rules
- Animate transform and opacity first.
- Minimize layout thrash.
- Watch image and video payload before layering motion on top.
- Audit whether motion still feels good on lower-end devices.

## Deliverable Format
```md
# GSAP Plan

## Motion Tokens

## Animated Sections

## Timeline Strategy

## ScrollTrigger Usage

## Cleanup Notes

## Performance Risks
```
