// Simple search functionality using lunr.js
(function() {
  let searchIndex;
  let searchData;
  
  // Initialize search
  async function initSearch() {
    const searchInputDesktop = document.querySelector('#search-input');
    const searchResultsDesktop = document.querySelector('#search-results');
    const searchInputMobile = document.querySelector('#search-input-mobile');
    const searchResultsMobile = document.querySelector('#search-results-mobile');
    
    if (!searchInputDesktop && !searchInputMobile) return;
    
    try {
      // Load search data
      const response = await fetch('/search.json');
      searchData = await response.json();
      
      // Build search index with lunr.js
      searchIndex = lunr(function() {
        this.ref('id');
        this.field('title', { boost: 10 });
        this.field('categories', { boost: 5 });
        this.field('tags', { boost: 5 });
        this.field('description', { boost: 3 });
        this.field('ingredients');
        this.field('content');
        
        searchData.forEach((doc, idx) => {
          doc.id = idx;
          this.add(doc);
        });
      });
      
      // Setup desktop search
      if (searchInputDesktop && searchResultsDesktop) {
        setupSearchInput(searchInputDesktop, searchResultsDesktop);
      }
      
      // Setup mobile search
      if (searchInputMobile && searchResultsMobile) {
        setupSearchInput(searchInputMobile, searchResultsMobile);
      }
      
    } catch (error) {
      console.error('Error initializing search:', error);
    }
  }
  
  function setupSearchInput(searchInput, searchResults) {
    let searchTimeout;
    
    // Handle search input
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      const query = e.target.value.trim();
      
      if (query.length < 2) {
        hideResults(searchResults);
        return;
      }
      
      searchTimeout = setTimeout(() => {
        performSearch(query, searchResults);
      }, 300);
    });
    
    // Close results when clicking outside
    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        hideResults(searchResults);
      }
    });
    
    // Close results on escape
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        hideResults(searchResults);
        searchInput.blur();
      }
    });
  }
  
  function performSearch(query, searchResults) {
    if (!searchResults || !searchIndex) return;
    
    try {
      // Search with wildcards for partial matching
      const results = searchIndex.search(`${query}* ${query}`);
      
      if (results.length === 0) {
        showNoResults(searchResults);
        return;
      }
      
      displayResults(results.slice(0, 10), searchResults); // Show top 10 results
    } catch (error) {
      console.error('Search error:', error);
    }
  }
  
  function displayResults(results, searchResults) {
    if (!searchResults) return;
    
    const html = results.map(result => {
      const item = searchData[result.ref];
      return `
        <div class="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer transition-colors border-b border-gray-200 dark:border-gray-600 last:border-b-0">
          <a href="${item.url}" class="block">
            <div class="font-medium text-gray-900 dark:text-gray-100 mb-1">${highlightMatch(item.title)}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400 mb-1">${truncate(item.description || item.content, 120)}</div>
            ${item.categories ? `<div class="text-xs text-primary-600 dark:text-primary-400">${item.categories.join(', ')}</div>` : ''}
          </a>
        </div>
      `;
    }).join('');
    
    searchResults.innerHTML = html;
    searchResults.classList.remove('hidden');
  }
  
  function showNoResults(searchResults) {
    if (!searchResults) return;
    
    searchResults.innerHTML = `
      <div class="px-4 py-3 text-center">
        <div class="font-medium text-gray-900 dark:text-gray-100 mb-1">No results found</div>
        <div class="text-sm text-gray-600 dark:text-gray-400">Try different keywords or browse by category</div>
      </div>
    `;
    searchResults.classList.remove('hidden');
  }
  
  function hideResults(searchResults) {
    if (searchResults) {
      searchResults.classList.add('hidden');
    }
  }
  
  function highlightMatch(text) {
    // Simple highlight - could be enhanced with actual query matching
    return text;
  }
  
  function truncate(text, length) {
    if (!text) return '';
    if (text.length <= length) return text;
    return text.substr(0, length) + '...';
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSearch);
  } else {
    initSearch();
  }
})();
