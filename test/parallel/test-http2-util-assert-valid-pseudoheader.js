// Flags: --expose-internals
'use strict';

const common = require('../common');

// Tests the assertValidPseudoHeader function that is used within the
// mapToHeaders function. The assert function is not exported so we
// have to test it through mapToHeaders

const { mapToHeaders } = require('internal/http2/util');

// These should not throw
mapToHeaders({ ':status': 'a' });
mapToHeaders({ ':path': 'a' });
mapToHeaders({ ':authority': 'a' });
mapToHeaders({ ':scheme': 'a' });
mapToHeaders({ ':method': 'a' });

common.expectsError(() => mapToHeaders({ ':foo': 'a' }), {
  code: 'ERR_HTTP2_INVALID_PSEUDOHEADER',
  type: TypeError,
  message: '":foo" is an invalid pseudoheader or is used incorrectly'
});
