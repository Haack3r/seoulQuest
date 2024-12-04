import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "../../lib/utils"; // Adjust this path if needed

const Avatar = React.forwardRef(
  (props, ref) => (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        props.className
      )}
      {...props}
    />
  )
);
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef(
  (props, ref) => (
    <AvatarPrimitive.Image
      ref={ref}
      className={cn("aspect-square h-full w-full", props.className)}
      {...props}
    />
  )
);
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef(
  (props, ref) => (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-muted",
        props.className
      )}
      {...props}
    />
  )
);
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

// Ensure you export the components correctly
export { Avatar, AvatarImage, AvatarFallback }; // Ensure these are named exports
