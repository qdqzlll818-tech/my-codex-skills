const test = require('node:test');
const assert = require('node:assert/strict');

const {
  parseClock,
  formatDuration,
  getMood,
  resolvePersona,
  getFridayMood,
  getFridayDemandCopy,
} = require('../script.js');

test('formatDuration keeps two digits and supports more than one hour', () => {
  assert.equal(formatDuration(4329), '01:12:09');
  assert.equal(formatDuration(59), '00:00:59');
  assert.equal(formatDuration(-8), '00:00:00');
});

test('parseClock uses the local calendar day of the supplied date', () => {
  const base = new Date(2026, 7, 12, 9, 30, 45, 123);
  const target = parseClock('18:05', base);
  assert.deepEqual(
    [target.getFullYear(), target.getMonth(), target.getDate(), target.getHours(), target.getMinutes(), target.getSeconds(), target.getMilliseconds()],
    [2026, 7, 12, 18, 5, 0, 0],
  );
});

test('getMood maps every countdown boundary to the intended state', () => {
  const cases = [
    [10801, 'calm'],
    [10800, 'anticipating'],
    [7200, 'watching'],
    [3600, 'excited'],
    [1800, 'alert'],
    [600, 'alert'],
    [599, 'sensitive'],
    [60, 'holding'],
    [1, 'holding'],
    [0, 'offwork'],
    [-1799, 'offwork'],
    [-1800, 'overtime'],
  ];

  for (const [seconds, expected] of cases) {
    assert.equal(getMood(seconds).key, expected, `seconds=${seconds}`);
  }
});

test('every mood exposes human copy for the primary and secondary lines', () => {
  for (const seconds of [20000, 9000, 5000, 2500, 1000, 300, 30, 0, -2000]) {
    const mood = getMood(seconds);
    assert.ok(mood.label.length > 0);
    assert.ok(mood.headline.length > 0);
    assert.ok(mood.detail.length > 0);
  }
});

test('resolvePersona enables Friday from the local weekday and honors preview overrides', () => {
  const friday = new Date(2026, 7, 14, 12, 0, 0);
  const thursday = new Date(2026, 7, 13, 12, 0, 0);

  assert.equal(resolvePersona(friday), 'friday');
  assert.equal(resolvePersona(thursday), 'normal');
  assert.equal(resolvePersona(thursday, 'friday'), 'friday');
  assert.equal(resolvePersona(friday, 'normal'), 'normal');
  assert.equal(resolvePersona(friday, 'banana'), 'friday');
});

test('getFridayMood maps the requested screenshot boundaries to Friday copy', () => {
  const cases = [
    [10801, 'friday-calm', '今天可是周五'],
    [10800, 'friday-anticipating', '可以开始期待了'],
    [7200, 'friday-preparing', '已进入周末预备状态'],
    [3600, 'friday-no-new-work', '请不要开展任何新项目'],
    [1800, 'friday-no-new-work', '请不要开展任何新项目'],
    [1799, 'friday-loading', '周末正在加载'],
    [600, 'friday-loading', '周末正在加载'],
    [599, 'friday-hands-off', '谁都别碰我'],
    [60, 'friday-hands-off', '谁都别碰我'],
    [59, 'friday-quiet', '保持安静'],
    [0, 'friday-unlocked', '可以走了'],
    [-1800, 'friday-overtime', '可以走了'],
  ];

  for (const [seconds, key, headline] of cases) {
    const mood = getFridayMood(seconds);
    assert.equal(mood.key, key, `seconds=${seconds}`);
    assert.equal(mood.headline, headline, `seconds=${seconds}`);
    assert.ok(mood.detail.length > 0);
  }
});

test('getFridayDemandCopy escalates through three Friday reactions and then stays final', () => {
  assert.deepEqual(getFridayDemandCopy(1), ['今天？？？', '要不要先看看今天星期几。']);
  assert.deepEqual(getFridayDemandCopy(2), ['又来？', '周五下午不宜建立新的工作关系。']);
  assert.deepEqual(getFridayDemandCopy(3), ['下周一见', '本系统已拒绝继续讨论。']);
  assert.deepEqual(getFridayDemandCopy(9), ['下周一见', '本系统已拒绝继续讨论。']);
});
