'use client';

import * as React from 'react';
import { SAMPLE_RESOURCES, RESOURCE_CATEGORIES } from '@/lib/data/resources';
import { Input } from '@/components/ui/input';
import { ResourceCard } from '@/components/resources/ResourceCard';

export function ResourcesClient() {
  const [query, setQuery] = React.useState('');
  const [tag, setTag] = React.useState('');

  const filtered = SAMPLE_RESOURCES.filter((item) => {
    const matchesQuery = item.title.includes(query) || item.body.includes(query);
    const matchesTag = tag ? item.tags.includes(tag) : true;
    return matchesQuery && matchesTag;
  });

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="キーワードで検索"
          className="md:max-w-sm"
        />
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setTag('')}
            className={`rounded-full px-4 py-2 text-xs font-semibold ${
              tag === '' ? 'bg-blush-500 text-white' : 'bg-white text-blush-600 border border-blush-100'
            }`}
          >
            すべて
          </button>
          {RESOURCE_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setTag(category)}
              className={`rounded-full px-4 py-2 text-xs font-semibold ${
                tag === category ? 'bg-blush-500 text-white' : 'bg-white text-blush-600 border border-blush-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((item) => (
          <ResourceCard key={item.id} title={item.title} body={item.body} tags={item.tags} />
        ))}
      </div>
    </div>
  );
}
