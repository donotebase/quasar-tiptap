/**
 * Data: Editor
 *
 * @author Micle Bu, micle@oriovo.com
 * @version 1.0
 * @date 2020.04.11
 */
export const BasicFeaturesArticle = `
<h1>quasar-tiptap</h1><h2 id="d5fb3c" level="2">Introduction</h2><p><strong><span style="color: #1890ff">Quasar Tiptap Editor</span></strong>&nbsp;is a WYSIWYG rich-text editor using&nbsp;tiptap&nbsp;and Quasar.🔥</p><h2 id="3b0d30" level="2">Text</h2><p data-text-align="center"><strong><span style="font-family: Arial Black">Bold text</span></strong></p><p><em>Italic text</em></p><p><u>Underline text</u></p><p><s>Strike through text</s></p><p><code>Inline code</code></p><p><span style="color: #ff4d4f">Text with color</span></p><p><span style="background: #ffec3d">Text with background</span></p><p></p><h2 id="2c1e92" level="2">Code</h2><p data-indent="1">This a indent Text.</p><blockquote><p>This is a block quote</p><p>Second line</p></blockquote><pre><code>let a = 10
let b = 20</code></pre><h2 id="ce7176" level="2">Diagram</h2><p></p><diagram src="graph TD
A[Christmas] -->|Get money| B(Go shopping)
B --> C{Let me think}
C -->|One| D[Laptop]
C -->|Two| E[iPhonee]
C -->|Three| F[Cars]"></diagram><h2 id="a4baf0" level="2">Math</h2><p><span style="color: rgb(0, 0, 0)"><span style="font-family: Roboto, -apple-system, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif">Write inline formula, such as&nbsp;</span></span><ki src="\\Gamma(n) = (n-1)!\\quad\\forall n\\in\\mathbb N"></ki>，or block formula:</p><p></p><katex src="E=mc^2"></katex><p></p><katex src="e^x=\\lim_{n\\to\\infty} \\left( 1+\\frac{x}{n} \\right)^n"></katex><p></p>
`

export const BasicFeaturesArticleJson = `
{"type":"doc","content":[{"type":"title","content":[{"type":"text","text":"quasar-tiptap"}]},{"type":"heading","attrs":{"textAlign":"","indent":0,"lineHeight":"","level":"2","id":"d5fb3c"},"content":[{"type":"text","text":"Introduction"}]},{"type":"paragraph","attrs":{"textAlign":null,"indent":null,"lineHeight":null}}]}
`

export const FullFeaturedArticle = `
<h1>Full Featured</h1>
<h2 id="78b268" level="2">Introduction</h2>
<p>🔥Quasar Tiptap Editor 🔥is a WYSIWYG rich-text editor using&nbsp;tiptap&nbsp;and Quasar.</p>
<p>that's easy to use, friendly to developers, fully extensible and clean in design.</p>
<h2 id="fda00d" level="2">Heading</h2>
<h2 id="752ca3" level="2">List</h2>
<h2 id="859f4c" level="2">Table</h2>
<table>
  <tbody>
    <tr>
      <td>
        <p></p>
      </td>
      <td>
        <p></p>
      </td>
      <td>
        <p></p>
      </td>
    </tr>
    <tr>
      <td>
        <p></p>
      </td>
      <td>
        <p></p>
      </td>
      <td>
        <p></p>
      </td>
    </tr>
    <tr>
      <td>
        <p></p>
      </td>
      <td>
        <p></p>
      </td>
      <td>
        <p></p>
      </td>
    </tr>
  </tbody>
</table>
<h2 id="b1240b" level="2">Diagrams</h2>
<p></p>
<diagram src="graph TD
A[Christmas] -->|Get money| B(Go shopping)
B --> C{Let me think}
C -->|One| D[Laptop]
C -->|Two| E[iPhonee]
C -->|Three| F[Cars]"></diagram>
<h2 id="c082db" level="2">Math Formula</h2>
<h3 id="09bb5d" level="3">Inline</h3>
<p>
  <ki src="E=mc^2"></ki>
</p>
<h3 id="c35252" level="3">Block</h3>
<p></p>
<katex src="E=mc^2"></katex>
<p></p>
`
