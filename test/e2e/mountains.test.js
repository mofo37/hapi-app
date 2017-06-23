const db = require('./_db');
// const request = require('./_request');
const assert = require('chai').assert;

describe.only('mountains api', () => {

  before(db.drop);

  it('initial /GET returns empty list', () => {
    return request.get('/api/mountains')
      .then(req => {
        const mountains = req.body;
        assert.deepEqual(mountains, []);
      });
  });

  let MountHood = {
    name: 'Mt. Hood',
    height: 11250
  };

  let MountSaintHelen = {
    name: 'Mt. Saint Helen',
    height: 11000
  };

  let MountRanier = {
    name: 'Mt. Ranier',
    height: 10000
  };

  function saveMountain(mountain) {
    return request
      .post('/api/mountains')
      .send(mountain)
      .then(res => res.body);
  }

  it('roundtrips a new mountain', () => {
    return saveMountain(MountHood)
      .then(saved => {
        assert.ok(saved._id, 'saved has id');
        MountHood = saved;
      })
      .then(() => {
        return request.get(`/api/mountains/${MountHood._id}`);
      })
      .then(res => res.body)
      .then(got => {
        assert.equal(got._id, MountHood._id);
      });
  });

  it('GET returns 404 for non-existent id', () => {
    const nonId = '589d04a8b6695bbdfd3106f1';
    return request.get(`/api/mountains/${nonId}`)
      .then(
      () => { throw new Error('expected 404'); },
      res => {
        assert.equal(res.status, 404);
      }
      );
  });

  it('returns list of all mountains', () => {
    return Promise.all([
      saveMountain(MountSaintHelen),
      saveMountain(MountRanier)
    ])
      .then(savedMountains => {
        MountSaintHelen = savedMountains[0];
        MountRanier = savedMountains[1];
      })
      .then(() => request.get('/api/mountains'))
      .then(res => res.body)
      .then(mountains => {
        assert.equal(mountains.length, 3);
        assert.include(mountains, MountHood);
        assert.include(mountains, MountSaintHelen);
        assert.include(mountains, MountRanier);
      });
  });

  it('updates mountain', () => {
    MountHood.height = 11200;
    return request.put(`/api/mountains/${MountHood._id}`)
      .send(MountHood)
      .then(res => res.body)
      .then(updated => {
        assert.equal(updated.height, 11200);
      });
  });

  it('deletes a mountain', () => {
    return request.delete(`/api/mountains/${MountSaintHelen._id}`)
      .then(res => res.body)
      .then(result => {
        assert.isTrue(result.removed);
      })
      .then(() => request.get('/api/mountains'))
      .then(res => res.body)
      .then(mountains => {
        assert.equal(mountains.length, 2);
      });
  });

  it('delete a non-existent mountain is removed false', () => {
    return request.delete(`/api/mountains/${MountRanier._id}`)
      .then(res => res.body)
      .then(result => {
        assert.isFalse(result.removed);
      });
  });

  it('errors on validation failure', () => {
    return saveMountain({})
      .then(
      () => { throw new Error('expected failure'); },
      () => { }
      );
  });

});