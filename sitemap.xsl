<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
<xsl:output method="html" encoding="UTF-8" indent="yes"/>
<xsl:template match="/"><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>ITSS.asia sitemap</title>
<style>body{font:15px/1.5 system-ui,sans-serif;margin:0;padding:32px 6%;color:#1f2022}h1{font-size:24px;margin:0 0 6px}p{color:#4d5662;margin:0 0 24px}table{border-collapse:collapse;width:100%;max-width:1100px}th,td{text-align:left;padding:9px 12px;border-bottom:1px solid #d9dde5}th{font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:#4d5662}a{color:#0b5fff;text-decoration:none}a:hover{text-decoration:underline}</style></head>
<body><h1>ITSS.asia sitemap</h1><p><xsl:value-of select="count(s:urlset/s:url)"/> URLs (English and Vietnamese)</p>
<table><tr><th>#</th><th>URL</th><th>Lang</th><th>Updated</th></tr>
<xsl:for-each select="s:urlset/s:url"><tr><td><xsl:value-of select="position()"/></td><td><a href="{s:loc}"><xsl:value-of select="s:loc"/></a></td><td><xsl:choose><xsl:when test="contains(s:loc,'/vi/')">vi</xsl:when><xsl:otherwise>en</xsl:otherwise></xsl:choose></td><td><xsl:value-of select="s:lastmod"/></td></tr></xsl:for-each>
</table></body></html></xsl:template></xsl:stylesheet>
