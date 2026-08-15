import { CSSProperties, ElementType, ReactNode, useState } from 'react';

interface HoverableProps {
  as?: ElementType;
  style?: CSSProperties;
  /** Styles merged over `style` while hovered or focused. */
  hoverStyle?: CSSProperties;
  children?: ReactNode;
  [key: string]: any;
}

/**
 * Small polymorphic element that swaps in `hoverStyle` on hover/focus. Replaces
 * the design's `style-hover` attribute, since inline styles can't express :hover.
 * The transition itself comes from the `transition` property in `style`.
 */
export function Hoverable({ as, style, hoverStyle, children, ...rest }: HoverableProps) {
  const El: ElementType = as || 'div';
  const [active, setActive] = useState(false);
  return (
    <El
      {...rest}
      style={{ ...style, ...(active && hoverStyle ? hoverStyle : {}) }}
      onMouseEnter={(e: any) => { setActive(true); rest.onMouseEnter?.(e); }}
      onMouseLeave={(e: any) => { setActive(false); rest.onMouseLeave?.(e); }}
      onFocus={(e: any) => { setActive(true); rest.onFocus?.(e); }}
      onBlur={(e: any) => { setActive(false); rest.onBlur?.(e); }}
    >
      {children}
    </El>
  );
}
