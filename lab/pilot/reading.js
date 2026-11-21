/* PILOT (21 Nov 2026): orders the end of a case page.
   Panel: photos, video, the three blocks, the quote.
   After the panel: Reflections, Artefacts, References.
   Last: the colophon (Link, Licence, Photos). */
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
  var after = document.createElement('div'); after.className = 'case__after';
  ['.case__writing', '.case__artefacts:not(.case__references)', '.case__references'].forEach(function (s) { var el = pick(s); if (el) after.appendChild(el); });
  var last = panel;
  if (after.children.length) { panel.after(after); last = after; }
  var end = pick('.case__facts--end');
  if (end) last.after(end);
});
