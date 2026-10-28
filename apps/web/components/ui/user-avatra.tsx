  import Image from "next/image";
  
  type UserAvatarProps = {
    name: string;
    imageUrl?: string | null;
    size?: number;
  };
  
  export default function UserAvatar({
    name,
    imageUrl,
    size = 32,
  }: UserAvatarProps) {
    return (
      <div
        className="relative shrink-0 overflow-hidden rounded-full bg-[#302947] flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes={`${size}px`}
            className="object-cover"
            unoptimized
          />
        ) : (
          <span className="text-xs font-semibold text-[#C4B5FD]">
            {name.charAt(0).toUpperCase()}
          </span>
        )}
      </div>
    );
  }