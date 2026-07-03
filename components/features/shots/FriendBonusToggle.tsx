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
      <label className="flex items-center gap-3 text-sm text-canton-ink">
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => onCheckedChange(event.target.checked)}
          className="h-5 w-5 accent-canton-green"
        />
        Check if you played with a friend
      </label>
      <input
        type="text"
        value={friendName}
        onChange={(event) => onFriendNameChange(event.target.value)}
        placeholder="Friends name"
        className="w-full rounded-lg border-2 border-canton-ink bg-white px-4 py-3 text-sm text-canton-ink placeholder:text-canton-muted focus:outline-none"
      />
    </div>
  );
}
