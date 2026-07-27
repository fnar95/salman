export interface LinkItem {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  iconName: 'code' | 'globe' | 'zap' | 'shield' | 'star' | 'rocket';
  colorTheme: 'cyan' | 'pink' | 'purple' | 'emerald';
  badgeText: string;
  likesCount: number;
  featuredTag?: string;
  description: string;
}

export type NeonTheme = 'cyan' | 'synthwave' | 'emerald' | 'gold';
