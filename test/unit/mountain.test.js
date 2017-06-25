const assert = require('chai').assert;
const Mountain = require('../../lib/models/mountain');

const expectedValidation = () => { throw new Error('expected validation errors'); };

describe('mountains model', () => {

  it('validates good model', () => {
    const mountain = new Mountain({
      name: 'Mt. Hood',
      height: 11230
    });
    return mountain.validate();
  });

  describe('validation failures', () => {

    it('name and height required', () => {
      const mountain = new Mountain();
      return mountain.validate()
        .then(expectedValidation,
        err => {
          const errors = err.errors;
          assert.ok(errors.height && errors.height.kind === 'required');
          assert.ok(errors.name && errors.name.kind === 'required');

        });
    });

    it('has height of at least 1000', () => {
      const mountain = new Mountain({
        name: 'mountain',
        height: 500
      });

      return mountain.validate()
        .then(expectedValidation,
        err => {
          const errors = err.errors;
          assert.ok(errors.height && errors.height.kind === 'min');
        }
        );
    });
    
    it('height is no greater than 11250', () => {
      const mountain = new Mountain({
        name: 'mountain',
        height: 12000
      });

      return mountain.validate()
        .then(expectedValidation,
        err => {
          const errors = err.errors;
          assert.ok(errors.height && errors.height.kind === 'max');
        }
        );
    });
  });
});