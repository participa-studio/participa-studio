/* PILOT (21 Nov 2026): orders the end of a case page.
   Panel: photos, video, the three blocks, the quote.
   Ending: one block under the panel, closed by one line. Every group
   (Reflections, Artefacts, References, Link, Licence, Photos) is a small label
   with its items beside it on wide screens, above them on phones. No lines between groups. */
document.addEventListener('DOMContentLoaded', function () {
  var article = document.querySelector('article.case');
  if (!article) return;
  var lead = article.querySelector('.case__lead');
  if (lead) { var w = document.createElement('div'); w.className = 'case__lead-wrap'; lead.before(w); w.appendChild(lead); }
  var top = article.querySelector('.case__facts:not(.case__facts--end)');
  if (!top) return;
  var pick = function (sel) { return article.querySelector(':scope > ' + sel); };

  var panel = document.createElement('div'); panel.className = 'case__panel';
  ['.slider', '.case__video', '.case__blocks', '.case__quote'].forEach(function (s) { var el = pick(s); if (el) panel.appendChild(el); });
  top.after(panel);

  var ending = document.createElement('dl'); ending.className = 'case__ending';
  var group = function (label, items) {
    if (!items.length) return;
    var dt = document.createElement('dt'); dt.textContent = label;
    var dd = document.createElement('dd');
    items.forEach(function (it) { dd.appendChild(it); });
    ending.appendChild(dt); ending.appendChild(dd);
  };
  var item = function (href, name, meta, attrs) {
    var el = document.createElement(href ? 'a' : 'span');
    el.className = 'case__ending-item';
    if (href) { el.href = href; Object.keys(attrs || {}).forEach(function (k) { if (attrs[k] !== null) el.setAttribute(k, attrs[k]); }); }
    var n = document.createElement('span'); n.className = 'case__ending-name'; n.textContent = name; el.appendChild(n);
    if (meta) { var m = document.createElement('span'); m.className = 'case__ending-meta'; m.textContent = meta; el.appendChild(m); }
    return el;
  };

  var writing = pick('.case__writing');
  if (writing) {
    var posts = [].map.call(writing.querySelectorAll('a.blog__item'), function (a) {
      var t = a.querySelector('.blog__title'), d = a.querySelector('.blog__date');
      return item(a.getAttribute('href'), t ? t.textContent.trim() : a.textContent.trim(), d ? d.textContent.trim() : '');
    });
    group('Reflections', posts); writing.remove();
  }
  [['.case__artefacts:not(.case__references)', 'Artefacts'], ['.case__references', 'References']].forEach(function (pair) {
    var sec = pick(pair[0]); if (!sec) return;
    var rows = [].map.call(sec.querySelectorAll('li'), function (li) {
      var a = li.querySelector('a');
      var name = li.querySelector('.case__artefact-name'), meta = li.querySelector('.case__artefact-meta');
      return item(a ? a.getAttribute('href') : null, name ? name.textContent.trim() : li.textContent.trim(), meta ? meta.textContent.trim() : '',
        a ? { target: a.getAttribute('target'), rel: a.getAttribute('rel'), download: a.hasAttribute('download') ? '' : null } : null);
    });
    var h = sec.querySelector('h2');
    var label = h ? h.textContent.trim() : pair[1];
    var custom = document.querySelector('meta[name="pilot-references-label"]');
    if (pair[1] === 'References' && custom) label = custom.getAttribute('content');
    group(label, rows); sec.remove();
  });
  var end = pick('.case__facts--end');
  if (end) {
    [].forEach.call(end.querySelectorAll(':scope > div'), function (d) {
      var dt = d.querySelector('dt'), dd = d.querySelector('dd');
      var wrap = document.createElement('span'); wrap.className = 'case__ending-item case__ending-text'; wrap.innerHTML = dd.innerHTML;
      group(dt.textContent.trim(), [wrap]);
    });
    end.remove();
  }
  if (ending.children.length) panel.after(ending);
});
