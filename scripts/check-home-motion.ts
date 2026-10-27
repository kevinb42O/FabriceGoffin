import assert from 'node:assert/strict';
import { chapterProgress, openingScore } from '../src/lib/homeMotion';
import { fitStandpuntDesktop, galleryInk, standpuntProgress, standpuntenDistance, standpuntenPhase } from '../src/lib/standpuntenMotion';
import { firstStandpuntFrame, galleryStart, introDistance, newsTransferDistance, newsTransferProgress, introPhases, introScore } from '../src/lib/introSequence';

assert.equal(chapterProgress(-1, [.2, .8]), 0);
assert.equal(chapterProgress(2, [.2, .8]), 1);
assert.ok(Math.abs(chapterProgress(.5, [.2, .8]) - .5) < 1e-12);
assert.ok(openingScore.introExit[1] <= openingScore.statement[0], 'Intro heading must be gone when the next heading starts appearing');
assert.equal(1 - chapterProgress(openingScore.statement[0], openingScore.introExit), 0);
const inks = ['#292b24', '#263a32', '#253b48', '#faf5eb', '#483329'];
for (let item = 1; item < inks.length - 1; item++) {
  assert.equal(galleryInk(item - .00001, inks), galleryInk(item + .00001, inks), 'Ink must not jump at an item boundary');
}
assert.notEqual(galleryInk(2.2, inks), galleryInk(2.8, inks), 'Light/dark ink must interpolate through the camera transition');
for (const count of [1, 2, 6, 11]) {
  assert.equal(standpuntenPhase(-1, count), 0);
  assert.equal(standpuntenPhase(2, count), count - 1);
  assert.ok(standpuntenDistance(count) >= 0);
  for (let index = 0; index < count; index++) {
    const anchor = standpuntProgress(index, count);
    assert.ok(Math.abs(standpuntenPhase(anchor, count) - index) < 1e-9, `Navigation must land on item ${index}`);
    if (index > 0 && index < count - 1) {
      const before = standpuntenPhase(anchor - 1e-5, count);
      const after = standpuntenPhase(anchor + 1e-5, count);
      assert.ok(before < index && after > index, 'Camera must keep moving through every item');
    }
  }
  let previous = 0;
  for (let step = 0; step <= 1000; step++) {
    const phase = standpuntenPhase(step / 1000, count);
    assert.ok(phase >= previous && phase <= count - 1, 'Forward scrolling must stay monotonic and bounded');
    if (count > 1 && step > 0) {
      assert.ok(phase > previous, 'Every scroll increment must advance the camera');
      assert.ok(Math.abs((phase - previous) - (count - 1) / 1000) < 1e-9, 'Camera speed must stay continuous at item boundaries');
    }
    previous = phase;
  }
}
for (const [width, height] of [[1280, 720], [1440, 900], [2048, 1152], [2560, 1440]]) {
  const pixelsPerUnit = height! / (2 * Math.tan(Math.PI / 8) * 5);
  const frame = firstStandpuntFrame(width!, height!);
  const firstFit = fitStandpuntDesktop(width!, height!, 1, false);
  const expectedSize = 3 * firstFit.scale * pixelsPerUnit;
  assert.ok(Math.abs(frame.width / 100 * width! - expectedSize) < 1e-8, 'DOM and canvas photograph must have the same width');
  assert.ok(Math.abs(frame.height / 100 * height! - expectedSize) < 1e-8, 'DOM and canvas photograph must have the same height');
  for (const aspect of [2 / 3, 1, 16 / 9]) {
    for (const onRight of [false, true]) {
      const fitted = fitStandpuntDesktop(width!, height!, aspect, onRight);
      const imageHeight = 3 * fitted.scale * pixelsPerUnit;
      const imageWidth = imageHeight * aspect;
      const center = width! / 2 + fitted.x * pixelsPerUnit;
      assert.ok(imageHeight <= height! - 156 + 1e-8, 'Photos must leave room for the navigation');
      assert.ok(imageWidth <= width! * .61 + 1e-8, 'Images must fit their editorial column');
      if (aspect <= 1) assert.ok(imageHeight >= height! * .78, 'Portraits and squares must have a generous desktop height');
      if (onRight) assert.ok(center - imageWidth / 2 >= width! * .36 - 1e-8, 'Right image must not cover the copy');
      else assert.ok(center + imageWidth / 2 <= width! * .64 + 1e-8, 'Left image must not cover the copy');
    }
  }
}
assert.ok(introScore.opening >= 2.5, 'The opening must leave room to read the statement and biography');
assert.ok(introScore.biography >= introScore.opening * openingScore.biography[1], 'Biography navigation must land after the prose has fully appeared');
assert.ok(introScore.opening * (1 - openingScore.biography[1]) >= .25, 'The settled biography needs reading room before the handoff');
assert.equal(introPhases(0, 6).opening, 0);
assert.equal(introPhases(introScore.opening, 6).opening, 1);
assert.equal(introPhases(introScore.opening, 6).transfer, 0);
assert.equal(introPhases(galleryStart, 6).transfer, 1);
assert.equal(introPhases(galleryStart, 6).gallery, 0);
assert.equal(introPhases(introDistance(6), 6).gallery, 1);
for (let step = 1; step < 1000; step++) {
  const moment = introScore.opening + introScore.transfer * step / 1000;
  const next = introPhases(moment, 6);
  const previous = introPhases(moment - introScore.transfer / 1000, 6);
  assert.ok(next.transfer > previous.transfer, 'Every native scroll step must move the handoff');
  assert.equal(next.gallery, 0, 'Gallery camera waits behind the moving DOM image until the exact handoff');
}
// The tail holds the outgoing scene, while equal overlap preserves News' position.
for (const count of [1, 2, 6, 11]) {
  const galleryEnd = introDistance(count);
  const release = galleryEnd + newsTransferDistance;
  assert.equal(newsTransferProgress(galleryEnd, count), 0);
  assert.equal(newsTransferProgress(release, count), 1);
  assert.equal(newsTransferProgress(release + 3, count), 1);
  assert.equal(newsTransferProgress(0, count), 0);
  assert.ok(Math.abs((release + 1 - newsTransferDistance) - (galleryEnd + 1)) < 1e-10, 'News position must not change when the tail and overlap are added');
  for (let step = 1; step <= 100; step++) {
    const moment = galleryEnd + step / 100;
    assert.equal(introPhases(moment, count).gallery, 1, 'News transfer must not extend or slow the camera trajectory');
    assert.ok(newsTransferProgress(moment, count) > newsTransferProgress(moment - .01, count), 'Transfer must follow each forward and reverse scroll step');
  }
}
console.log('Home motion: continuous camera movement, navigation, scroll bounds and desktop image fitting pass.');
