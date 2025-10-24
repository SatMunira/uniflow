import * as React from "react";
import { cn } from "@/lib/cn";

export function Dialog({
    open,
    onOpenChange,
    children,
}: {
    open?: boolean;
    onOpenChange?: (v: boolean) => void;
    children: React.ReactNode;
}) {
    const escHandler = React.useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") onOpenChange?.(false);
        },
        [onOpenChange]
    );

    React.useEffect(() => {
        if (open) {
            document.addEventListener("keydown", escHandler);
        }
        return () => document.removeEventListener("keydown", escHandler);
    }, [open, escHandler]);

    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/40"
                onClick={() => onOpenChange?.(false)}
            />
            <div className="relative z-10 w-full max-w-[90vw]">{children}</div>
        </div>
    );
}

export function DialogTrigger({
    asChild,
    onOpenChange,
    children,
}: {
    asChild?: boolean;
    onOpenChange?: (v: boolean) => void;
    children: React.ReactNode;
}) {
    const child = React.Children.only(children) as React.ReactElement<
        { onClick?: (e?: React.MouseEvent) => void } & Record<string, any>
    >;

    const handleClick = (e?: React.MouseEvent) => {
        onOpenChange?.(true);
        if (child && typeof child.props?.onClick === "function") {
            child.props.onClick(e);
        }
    };

    if (asChild && React.isValidElement(child)) {
        return React.cloneElement(child, {
            onClick: handleClick,
        });
    }

    return (
        <button type="button" onClick={() => onOpenChange?.(true)}>
            {children}
        </button>
    );
}

export function DialogContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "w-full max-w-lg rounded-2xl bg-background border border-foreground/10 shadow-xl",
                className
            )}
            {...props}
        />
    );
}

export function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("p-4 pb-2", className)} {...props} />;
}
export function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    return <h2 className={cn("text-lg font-semibold", className)} {...props} />;
}
export function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn("p-4 pt-2 flex justify-end gap-2", className)} {...props} />;
}
