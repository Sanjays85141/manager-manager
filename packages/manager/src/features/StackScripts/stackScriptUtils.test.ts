import { Grant } from '@linode/api-v4/lib/account';

import { canUserModifyAccountStackScript } from './stackScriptUtils';

describe('canUserModifyStackScript', () => {
  let isRestrictedUser = false;
  const stackScriptGrants: Grant[] = [
    { id: 1, label: 'my_stackscript', permissions: 'read_only' },
    { id: 2, label: 'my__other_stackscript', permissions: 'read_write' },
  ];
  let stackScriptID = 1;

  it("should return true if the user isn't restricted", () => {
    isRestrictedUser = false;
    expect(
      canUserModifyAccountStackScript(
        isRestrictedUser,
        stackScriptGrants,
        stackScriptID
      )
    ).toBe(true);
  });

  it('should return true if the user is restricted but has read_write grants for this StackScript', () => {
    isRestrictedUser = true;
    stackScriptID = 2;
    expect(
      canUserModifyAccountStackScript(
        isRestrictedUser,
        stackScriptGrants,
        stackScriptID
      )
    ).toBe(true);

    stackScriptID = 1;
    expect(
      canUserModifyAccountStackScript(
        isRestrictedUser,
        stackScriptGrants,
        stackScriptID
      )
    ).toBe(false);

    stackScriptID = 100;
    expect(
      canUserModifyAccountStackScript(
        isRestrictedUser,
        stackScriptGrants,
        stackScriptID
      )
    ).toBe(false);
  });
});
