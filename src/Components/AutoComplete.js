import { autocomplete, getAlgoliaResults } from '@algolia/autocomplete-js';
import React, { createElement, Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createAutocomplete } from '@algolia/autocomplete-core';
import { Link } from 'react-router-dom';

export const AutoComplete = ({ searchClient }) => {
  const [autocompleteState, setAutocompleteState] = useState({});
  const autocomplete = useMemo(
    () =>
      createAutocomplete({
        insights: true,
        onStateChange({ state }) {
          setAutocompleteState(state);
        },
        getSources() {
          return [
            {
              sourceId: 'products',
              getItemInputValue({ item }) {
                return item.query;
              },
              getItems({ query }) {
                return getAlgoliaResults({
                  searchClient,
                  queries: [
                    {
                      indexName: 's8-hiring-challenge',
                      query,
                      params: {
                        hitsPerPage: 4,
                        highlightPreTag: '<mark>',
                        highlightPostTag: '</mark>',
                      },
                    },
                  ],
                });
              },
              getItemUrl({ item }) {
                return item.url;
              },
            },
          ];
        },
      }),
    []
  );

  return (
    <div className="aa-Autocomplete" {...autocomplete.getRootProps({})}>
      <input className="aa-Input" {...autocomplete.getInputProps({})} />
      <div className="aa-Panel" {...autocomplete.getPanelProps({})}>
        {autocompleteState.isOpen &&
          autocompleteState.collections.map((collection, index) => {
            const { source, items } = collection;
            return (
              <div key={`source-${index}`} className="aa-Source">
                {items.length > 0 && (
                  // <ul className="aa-List" {...autocomplete.getListProps()}>
                  <>
                    {items.map((item) => (
                      <div
                        key={item.objectID}
                        className="aa-Item"
                        {...autocomplete.getItemProps({
                          item,
                          source,
                        })}
                      >
                        <Link to={`/stock-price/${item.symbol}`}>
                          <div className='search-symbol'>{item.symbol}</div>
                          <div className='search-name'>{item.name}</div>
                        </Link>
                      </div>
                    ))}
                  </>
                  // </ul>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

