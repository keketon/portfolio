import React, { useState } from 'react';
import type { Card } from './model/Card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { useTr } from '@/i18n/tr';

interface CardSelectorProps {
  cards: Card[];
  onSelectCard: (card: Card) => void;
}

const CardSelector: React.FC<CardSelectorProps> = ({ cards, onSelectCard }: CardSelectorProps) => {
  const { tr } = useTr();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCards = cards.filter(card => card.name.includes(searchQuery));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="font-medium">{tr('Select Card', 'ScoreCalculator')}</label>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Search className="size-4" />
              {tr('Search Card', 'ScoreCalculator')}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[400px]">
            <div className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold">{tr('Select Card', 'ScoreCalculator')}</h2>
                <p className="text-sm text-muted-foreground">
                  {tr('Please select a card from the list', 'ScoreCalculator')}
                </p>
              </div>
              <div className="relative">
                <Search className="text-muted-foreground absolute left-3 top-1/2 size-4 -translate-y-1/2" />
                <Input
                  type="text"
                  placeholder={tr('Search by card name...', 'ScoreCalculator')}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="max-h-[400px] space-y-2 overflow-y-auto">
                {filteredCards.length > 0 ? (
                  filteredCards.map(card => (
                    <button
                      key={card.id}
                      onClick={() => {
                        onSelectCard(card);
                        setOpen(false);
                        setSearchQuery('');
                      }}
                      className="hover:bg-accent w-full rounded-md border p-3 text-left transition-colors"
                    >
                      <div className="font-medium">{card.name}</div>
                    </button>
                  ))
                ) : (
                  <div className="text-muted-foreground py-8 text-center text-sm">
                    {tr('No cards found', 'ScoreCalculator')}
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CardSelector;
