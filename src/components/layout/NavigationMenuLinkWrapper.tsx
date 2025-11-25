import { NavigationMenuLink } from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { forwardRef } from 'react';

type NavigationMenuLinkProps = Omit<React.ComponentPropsWithoutRef<typeof NavigationMenuLink>, 'href'> & {
  href: string;
  children: React.ReactNode;
};

const NavigationMenuLinkWrapper = forwardRef<
  React.ElementRef<typeof Link>,
  NavigationMenuLinkProps
>(({ href, children, onSelect, ...props }, ref) => (
  <Link
    href={href}
    ref={ref}
    {...props}
    onClick={(e) => {
      if (onSelect) {
        // Create a synthetic event compatible with React's SyntheticEvent
        onSelect(e as unknown as Event);
      }
    }}
  >
    {children}
  </Link>
));

NavigationMenuLinkWrapper.displayName = 'NavigationMenuLinkWrapper';

export default NavigationMenuLinkWrapper;