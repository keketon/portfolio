import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Home, SquareDivide, UserRound, type LucideProps } from 'lucide-react';
import kotoneIcon from '@/assets/kotone.jpg';
import ghIcon from '@/assets/github-mark-c791e9551fe4/github-mark/github-mark-white.svg';
import inIcon from '@/assets/in-logo/in-logo/LI-In-Bug.png';
import { Separator } from '../ui/separator';
import LanguageSwitch from '../LanguageSwitch';

interface NavItem {
  title: string;
  href: string;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>;
}

// Don't start with '/' in href: It ignores the base path (/portfolio as of May 2025)
const navItems: NavItem[] = [
  {
    title: 'Home',
    href: '/',
    icon: Home,
  },
  {
    title: 'About Me',
    href: 'about',
    icon: UserRound,
  },
  {
    title: 'Prime Factorization Game',
    href: 'pf-game',
    icon: SquareDivide,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="pt-8">
        <SidebarMenu>
          <SidebarMenuItem className="flex flex-col items-center">
            <a href="/" className="flex w-32 h-32">
              <Avatar className="rounded-full overflow-hidden">
                <AvatarImage src={kotoneIcon} alt="Profile Picture" />
                <AvatarFallback delayMs={300}>K.Y.</AvatarFallback>
              </Avatar>
            </a>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="pt-4">
        <SidebarGroup>
          <SidebarGroupLabel>Contents</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.href}>
                      <item.icon className="text-white/80" />
                      <span className="text-white/80 hover:text-white-10">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu className="flex flex-col items-center">
          <SidebarMenuItem>
            <LanguageSwitch />
          </SidebarMenuItem>
          <Separator className="my-4 max-w-11/12 self-center bg-white/50" />
          <SidebarMenuItem className="flex justify-center space-x-4">
            <a href="https://github.com/keketon" target="_blank" rel="noopener noreferrer">
              <img src={ghIcon} alt="GitHub" className="h-10" />
            </a>
            <a href="https://www.linkedin.com/in/keisuke-yabuoshi-826b4a1b1" target="_blank" rel="noopener noreferrer">
              <img src={inIcon} alt="LinkedIn" className="h-10" />
            </a>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <p className="text-white/50 text-xs text-center mt-4 mb-2">© 2025 keketon</p>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
