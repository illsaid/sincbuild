export interface DomainOption {
  id: string;
  domain: string;
  description: string;
}

export const DOMAIN_OPTIONS: DomainOption[] = [
  { id: 'japanese-cinema', domain: 'Japanese Cinema', description: 'Films from postwar Japan through the new wave' },
  { id: 'long-form-essays', domain: 'Long-form Essays', description: 'Reported and critical writing worth the hour' },
  { id: 'urbanism', domain: 'Urbanism', description: 'Cities, infrastructure, and how people move through space' },
  { id: 'biotech-signals', domain: 'Biotech Signals', description: 'Research and developments in life sciences' },
  { id: 'architecture', domain: 'Architecture', description: 'Buildings, interiors, and the built environment' },
  { id: 'political-economy', domain: 'Political Economy', description: 'Power, markets, and institutions' },
  { id: 'short-fiction', domain: 'Short Fiction', description: 'Stories under 10,000 words' },
  { id: 'documentary', domain: 'Documentary', description: 'Non-fiction film and long-form journalism on screen' },
  { id: 'design-criticism', domain: 'Design Criticism', description: 'Writing about objects, interfaces, and visual culture' },
  { id: 'science-writing', domain: 'Science Writing', description: 'Rigorous popular science across disciplines' },
];
