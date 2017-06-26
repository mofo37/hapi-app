const db = require('./_db');
const request = require('./_request');
const assert = require('chai').assert;


describe.only('Server', () => {

  before(db.drop);

  it('GETs an empty list', () => {
    console.log(request);
    request.get({url: '/mountains'}, (res) => {
      assert.equal(res.statusCode, 200);
      assert.deepEqual(res.body, []);
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
      .post('/mountains')
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
        return request.get(`/mountains/${MountHood._id}`);
      })
      .then(res => res.body)
      .then(got => {
        assert.equal(got._id, MountHood._id);
      });
  });

  it('GET returns 404 for non-existent id', () => {
    const nonId = '589d04a8b6695bbdfd3106f1';
    return request.get(`/mountains/${nonId}`)
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
      .then(() => request.get('/mountains'))
      .then(res => res.body)
      .then(mountains => {
        assert.equal(mountains.length, 3);
        assert.include(mountains, MountHood);
        assert.include(mountains, MountSaintHelen);
        assert.include(mountains, MountRanier);
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
