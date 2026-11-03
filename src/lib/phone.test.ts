import assert from 'node:assert/strict';
import { formatNationalNumber, joinPhone, splitPhone } from './phone';

assert.equal(formatNationalNumber('5551112233', '90'), '555 111 22 33');
assert.equal(formatNationalNumber('0555 111-22-33', '90'), '555 111 22 33', 'Baştaki 0 ve ayraçlar atılır');
assert.equal(formatNationalNumber('55511122339999', '90'), '555 111 22 33', 'Türkiye için 10 hane');
assert.equal(formatNationalNumber('555', '90'), '555');
assert.equal(formatNationalNumber('15123456789', '49'), '151 234 567 89');
assert.equal(formatNationalNumber('abc', '90'), '');

assert.deepEqual(splitPhone('+90 555 111 22 33'), { code: '90', national: '555 111 22 33' });
assert.deepEqual(splitPhone('+49 15123456789'), { code: '49', national: '151 234 567 89' });
assert.deepEqual(splitPhone(''), { code: '90', national: '' });
assert.deepEqual(splitPhone('05551112233'), { code: '90', national: '555 111 22 33' }, 'Kodsuz eski kayıt');

assert.equal(joinPhone('90', '555 111 22 33'), '+90 555 111 22 33');
assert.equal(joinPhone('90', '  '), '', 'Boş numara boş kaydedilir');

console.log('phone OK');
