import { Item } from '../types';

const makeId = () => Math.random().toString(36).slice(2, 10);

const SEEDS: Record<string, Omit<Item, 'id' | 'status'>[]> = {
  'japanese-cinema': [
    { title: 'Rashomon', source: 'Akira Kurosawa, 1950', note: 'The foundational film on subjectivity and unreliable memory' },
    { title: 'Tokyo Story', source: 'Yasujiro Ozu, 1953', note: 'Generational distance rendered with devastating restraint' },
    { title: 'Seven Samurai', source: 'Akira Kurosawa, 1954', note: 'The template for every ensemble action film that followed' },
    { title: 'Late Spring', source: 'Yasujiro Ozu, 1949', note: 'A daughter, a father, and the weight of obligation' },
    { title: 'Ugetsu', source: 'Kenji Mizoguchi, 1953', note: 'War and ghosts, ambition and its costs' },
    { title: 'Ikiru', source: 'Akira Kurosawa, 1952', note: 'A bureaucrat learns he is dying and tries to do one good thing' },
  ],
  'long-form-essays': [
    { title: 'The Turkey City Lexicon', source: 'Bruce Sterling, 1992', note: 'A handbook of science fiction writing sins — broadly applicable' },
    { title: 'Consider the Lobster', source: 'David Foster Wallace, Gourmet, 2004', note: 'A food review that became a philosophy of pain' },
    { title: 'The Death and Life of Great American Cities', source: 'Jane Jacobs, 1961', note: 'The book that changed how planners think about streets' },
    { title: 'Notes on Camp', source: 'Susan Sontag, Partisan Review, 1964', note: 'Still the best taxonomy of aesthetic irony' },
    { title: 'Slouching Towards Bethlehem', source: 'Joan Didion, Saturday Evening Post, 1967', note: 'The Haight-Ashbury collapse as cultural diagnosis' },
    { title: 'The White Album', source: 'Joan Didion, New West, 1979', note: 'Nervous breakdown as reportage' },
  ],
  'urbanism': [
    { title: 'Sidewalk City', source: 'Anastasia Loukaitou-Sideris, 2012', note: 'Pedestrian space as a lens on urban equity' },
    { title: 'The High Line', source: 'Lisa Chamberlain, Metropolis, 2004', note: 'Early reporting on the project before it was a destination' },
    { title: 'Houston Has No Zoning — What Happened?', source: 'Michael Lewyn, 2005', note: 'The most cited myth in American urban planning' },
    { title: 'Suburban Nation', source: 'Andres Duany, 2000', note: 'The sprawl critique in its most readable form' },
    { title: 'How Tokyo Became the World\'s Livable Megalopolis', source: 'Works in Progress, 2022', note: 'Permissive zoning and what it actually produced' },
    { title: 'The Street as Stage', source: 'David Crane, 1960', note: 'A short essay that prefigured everything about urban activity' },
  ],
  'biotech-signals': [
    { title: 'The Code Breaker', source: 'Walter Isaacson, 2021', note: 'Jennifer Doudna and the CRISPR story' },
    { title: 'A Long-Read on GLP-1 Mechanisms', source: 'Nature Reviews, 2023', note: 'Why the obesity drugs work better than anyone expected' },
    { title: 'Synthetic Biology\'s Infrastructure Problem', source: 'STAT News, 2023', note: 'Scale is the bottleneck, not the science' },
    { title: 'Organoids and the Limits of In Vitro', source: 'Cell, 2022', note: 'What mini-organs can and cannot tell us' },
    { title: 'The Protein Folding Decade', source: 'The Gradient, 2023', note: 'AlphaFold, two years later — what changed' },
    { title: 'Longevity\'s Marketing Problem', source: 'Milbank Quarterly, 2023', note: 'Why the field is struggling to separate signal from noise' },
  ],
  'architecture': [
    { title: 'Complexity and Contradiction in Architecture', source: 'Robert Venturi, 1966', note: 'The first serious attack on modernist purity' },
    { title: 'Learning from Las Vegas', source: 'Venturi, Scott Brown, Izenour, 1972', note: 'The decorated shed vs the duck — still unresolved' },
    { title: 'The Eyes of the Skin', source: 'Juhani Pallasmaa, 1996', note: 'Architecture as a multisensory experience, not visual composition' },
    { title: 'A Pattern Language', source: 'Christopher Alexander, 1977', note: '253 patterns for human-scale design — dip in anywhere' },
    { title: 'Towards a New Architecture', source: 'Le Corbusier, 1923', note: 'Read it knowing what happened next' },
    { title: 'The Architecture of Happiness', source: 'Alain de Botton, 2006', note: 'Accessible philosophy of why buildings make us feel things' },
  ],
  'political-economy': [
    { title: 'The Road to Serfdom', source: 'F.A. Hayek, 1944', note: 'Central planning and the unintended paths it creates' },
    { title: 'Doughnut Economics', source: 'Kate Raworth, 2017', note: 'Seven ways to think like a 21st century economist' },
    { title: 'The Great Transformation', source: 'Karl Polanyi, 1944', note: 'Markets are not natural — they are constructed' },
    { title: 'Capital in the Twenty-First Century', source: 'Thomas Piketty, 2013', note: 'Wealth concentration as a structural feature, not an anomaly' },
    { title: 'The Origins of Totalitarianism', source: 'Hannah Arendt, 1951', note: 'The conditions that make mass movements possible' },
    { title: 'Development as Freedom', source: 'Amartya Sen, 1999', note: 'Capability, not just GDP, as the measure of a good society' },
  ],
  'short-fiction': [
    { title: 'The Ones Who Walk Away from Omelas', source: 'Ursula K. Le Guin, 1973', note: 'The thought experiment that refuses a comfortable ending' },
    { title: 'Harrison Bergeron', source: 'Kurt Vonnegut, 1961', note: 'Radical equality taken to its logical conclusion' },
    { title: 'Bloodchild', source: 'Octavia Butler, 1984', note: 'A story about symbiosis that is also about a lot else' },
    { title: 'The Garden of Forking Paths', source: 'Jorge Luis Borges, 1941', note: 'The labyrinth is time itself' },
    { title: 'Story of Your Life', source: 'Ted Chiang, 1998', note: 'Language, free will, and the shape of a life lived all at once' },
    { title: 'The Nine Billion Names of God', source: 'Arthur C. Clarke, 1953', note: 'A short story that ends the world in two sentences' },
  ],
  'documentary': [
    { title: 'Sans Soleil', source: 'Chris Marker, 1983', note: 'Memory, travel, and the impossibility of recording experience' },
    { title: 'Hoop Dreams', source: 'Steve James, 1994', note: 'Four years with two families — a genuine masterwork' },
    { title: 'The Act of Killing', source: 'Joshua Oppenheimer, 2012', note: 'Perpetrators re-enact mass murder — impossible to look away' },
    { title: 'Grizzly Man', source: 'Werner Herzog, 2005', note: 'A portrait of self-delusion and genuine wildness' },
    { title: 'My Architect', source: 'Nathaniel Kahn, 2003', note: 'A son looks for his dead father in the buildings he left behind' },
    { title: 'Capturing the Friedmans', source: 'Andrew Jarecki, 2003', note: 'Truth becomes undecidable and you have to sit with that' },
  ],
  'design-criticism': [
    { title: 'The Design of Everyday Things', source: 'Don Norman, 1988', note: 'Why doors and faucets fail — and what it tells us about design' },
    { title: 'Ways of Seeing', source: 'John Berger, 1972', note: 'How we look at images and what that looking does to us' },
    { title: 'First Things First Manifesto', source: 'Ken Garland, 1964', note: 'A short declaration that still makes designers uncomfortable' },
    { title: 'Emigre and the Typographic Explosion', source: 'Steven Heller, 1999', note: 'How one magazine changed what type could do' },
    { title: 'Graphic Design Theory', source: 'Helen Armstrong, 2009', note: 'A useful anthology of the theory that most designers never read' },
    { title: 'Dieter Rams: As Little Design as Possible', source: 'Sophie Lovell, 2011', note: 'Ten principles that are either timeless or overused — depends who you ask' },
  ],
  'science-writing': [
    { title: 'The Selfish Gene', source: 'Richard Dawkins, 1976', note: 'The gene\'s-eye view — still the cleanest argument in evolutionary biology' },
    { title: 'Godel, Escher, Bach', source: 'Douglas Hofstadter, 1979', note: 'Self-reference, consciousness, and formal systems — 800 pages of joy' },
    { title: 'The Structure of Scientific Revolutions', source: 'Thomas Kuhn, 1962', note: 'Why science changes in lurches rather than accumulating smoothly' },
    { title: 'Surely You\'re Joking, Mr. Feynman', source: 'Richard Feynman, 1985', note: 'A physicist as a full human being — curious about everything' },
    { title: 'The Demon-Haunted World', source: 'Carl Sagan, 1995', note: 'Science as a candle in the dark — more relevant now than when written' },
    { title: 'Being Mortal', source: 'Atul Gawande, 2014', note: 'Medicine\'s failure to deal with dying — and what a good death might look like' },
  ],
};

export function seedShelf(domainId: string): Omit<Item, 'id' | 'status'>[] {
  return SEEDS[domainId] ?? [];
}

export function createSeededItems(domainId: string): Item[] {
  return seedShelf(domainId).map((item) => ({
    ...item,
    id: makeId(),
    status: 'unprocessed' as const,
  }));
}

export function createRefillItems(domainId: string, existingTitles: string[]): Item[] {
  const all = seedShelf(domainId);
  const fresh = all.filter((i) => !existingTitles.includes(i.title));
  const pool = fresh.length > 0 ? fresh : all;
  return pool.slice(0, 6).map((item) => ({
    ...item,
    id: makeId(),
    status: 'unprocessed' as const,
  }));
}
