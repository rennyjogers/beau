(function () {
  'use strict';

  var articleList = document.getElementById('article-list');
  var articleView = document.getElementById('article');

  function formatDate(date) {
    if (!date) return '';

    var parsedDate = new Date(date + 'T00:00:00');
    if (Number.isNaN(parsedDate.getTime())) return date;

    return parsedDate.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  function showMessage(element, className, message) {
    element.className = className;
    element.textContent = message;
  }

  function getParagraphs(body) {
    if (Array.isArray(body)) return body;

    return String(body || '')
      .split(/\r?\n\s*\r?\n/)
      .map(function (paragraph) { return paragraph.trim(); })
      .filter(Boolean);
  }

  function renderList(articles) {
    if (!articles.length) {
      showMessage(articleList, 'empty-state', 'New writings will appear here soon.');
      return;
    }

    articles.forEach(function (article) {
      var card = document.createElement('article');
      card.className = 'article-card';

      var title = document.createElement('h2');
      var link = document.createElement('a');
      link.href = 'article.html?slug=' + encodeURIComponent(article.slug);
      link.textContent = article.title;
      title.appendChild(link);

      var date = document.createElement('p');
      date.className = 'article-date';
      date.textContent = formatDate(article.date);

      var excerpt = document.createElement('p');
      excerpt.className = 'article-excerpt';
      excerpt.textContent = article.excerpt;

      card.appendChild(title);
      card.appendChild(date);
      card.appendChild(excerpt);
      articleList.appendChild(card);
    });
  }

  function renderArticle(articles) {
    var slug = new URLSearchParams(window.location.search).get('slug');
    var article = articles.find(function (item) { return item.slug === slug; });

    if (!article) {
      showMessage(articleView, 'error-state', 'That article could not be found.');
      return;
    }

    document.title = article.title + ' | Writings';

    var title = document.createElement('h1');
    title.textContent = article.title;

    var date = document.createElement('p');
    date.className = 'article-date';
    date.textContent = formatDate(article.date);

    var body = document.createElement('div');
    body.className = 'article-body';
    getParagraphs(article.body).forEach(function (paragraph) {
      var paragraphElement = document.createElement('p');
      paragraphElement.textContent = paragraph;
      body.appendChild(paragraphElement);
    });

    articleView.appendChild(title);
    articleView.appendChild(date);
    articleView.appendChild(body);
  }

  fetch('articles.json')
    .then(function (response) {
      if (!response.ok) throw new Error('Could not load articles.');
      return response.json();
    })
    .then(function (data) {
      var articles = Array.isArray(data) ? data : data.articles;
      if (!Array.isArray(articles)) throw new Error('Invalid article data.');

      if (articleList) renderList(articles);
      if (articleView) renderArticle(articles);
    })
    .catch(function () {
      var target = articleList || articleView;
      showMessage(target, 'error-state', 'Writings are temporarily unavailable.');
    });
}());
