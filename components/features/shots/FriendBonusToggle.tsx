type FriendBonusToggleProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  friendName: string;
  onFriendNameChange: (value: string) => void;
};

export function FriendBonusToggle({
  checked,
  onCheckedChange,
  friendName,
  onFriendNameChange,
}: FriendBonusToggleProps) {
  return (
    <div className="flex w-full flex-col gap-3">
      <label className="flex items-center gap-3 text-base text-canton-ink">
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => {
            const nextChecked = event.target.checked;
            onCheckedChange(nextChecked);
            if (!nextChecked) {
              onFriendNameChange("");
            }
          }}
          className="h-7 w-7 shrink-0 accent-canton-green"
        />
        Check if you played with a friend
      </label>
      {checked ? (
        <input
          type="text"
          value={friendName}
          onChange={(event) => onFriendNameChange(event.target.value)}
          placeholder="Friend's name"
          className="w-full rounded-lg border-2 border-canton-ink bg-white px-4 py-3 text-sm text-canton-ink placeholder:text-canton-muted focus:outline-none"
        />
      ) : null}
    </div>
  );
}
