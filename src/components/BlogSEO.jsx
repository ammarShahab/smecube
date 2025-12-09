import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * Comprehensive SEO Component for Blog Posts
 * Includes: JSON-LD Schema, Open Graph, Twitter Cards, and more
 */
const BlogSEO = ({ post, type = 'article', relatedPosts = [] }) => {
  const siteUrl = 'https://smecube.com';
  const siteName = 'এসএমী কিউব';
  const defaultImage = `${siteUrl}/og-default.jpg`;
  
  // Prepare SEO data
  const title = post?.meta_title || post?.title || 'Blog';
  const description = post?.meta_description || post?.excerpt || '';
  const keywords = post?.meta_keywords || post?.category?.name || '';
  const image = post?.og_image || post?.image_url || defaultImage;
  const url = `${siteUrl}/blogs/${post?.slug || ''}`;
  const author = post?.author || 'এসএমী কিউব টিম';
  const publishedTime = post?.created_at || new Date().toISOString();
  const modifiedTime = post?.updated_at || publishedTime;
  
  // Generate Article Schema (JSON-LD)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post?.title,
    "description": post?.excerpt,
    "image": [
      image,
      ...(post?.sections?.map(s => s.image_url).filter(Boolean) || [])
    ],
    "datePublished": publishedTime,
    "dateModified": modifiedTime,
    "author": {
      "@type": "Person",
      "name": author,
      "url": `${siteUrl}/author/${author.toLowerCase().replace(/\s+/g, '-')}`
    },
    "publisher": {
      "@type": "Organization",
      "name": siteName,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "articleSection": post?.category?.name,
    "keywords": keywords,
    "wordCount": post?.content?.split(/\s+/).length || 0,
    "timeRequired": post?.read_time || "5 মিনিট",
    "inLanguage": "bn-BD"
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "হোম",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "ব্লগ",
        "item": `${siteUrl}/blogs`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post?.category?.name,
        "item": `${siteUrl}/blogs?category=${post?.category?.slug}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": post?.title,
        "item": url
      }
    ]
  };

  // FAQ Schema (if key_points exist)
  const faqSchema = post?.key_points?.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": post.key_points.map((point, index) => ({
      "@type": "Question",
      "name": point,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": post?.sections?.[index]?.content || point
      }
    }))
  } : null;

  // HowTo Schema (if tips exist)
  const howToSchema = post?.tips?.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `${post?.title} - টিপস`,
    "description": post?.excerpt,
    "image": image,
    "totalTime": post?.read_time,
    "step": post.tips.map((tip, index) => ({
      "@type": "HowToStep",
      "name": `স্টেপ ${index + 1}`,
      "text": tip,
      "position": index + 1
    }))
  } : null;

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteName,
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`,
    "sameAs": [
      "https://facebook.com/smecube",
      "https://twitter.com/smecube",
      "https://linkedin.com/company/smecube"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+880-XXX-XXXXXX",
      "contactType": "Customer Service",
      "areaServed": "BD",
      "availableLanguage": ["bn", "en"]
    }
  };

  // WebPage Schema
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": url,
    "inLanguage": "bn-BD",
    "isPartOf": {
      "@type": "WebSite",
      "name": siteName,
      "url": siteUrl
    },
    "primaryImageOfPage": {
      "@type": "ImageObject",
      "url": image,
      "width": 1200,
      "height": 630
    },
    "datePublished": publishedTime,
    "dateModified": modifiedTime
  };

  // Related Articles (if available)
  const relatedSchema = relatedPosts?.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": relatedPosts.map((relPost, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `${siteUrl}/blogs/${relPost.slug}`
    }))
  } : null;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title} - {siteName}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />
      
      {/* Language and Region */}
      <meta name="language" content="Bengali" />
      <meta name="geo.region" content="BD" />
      <meta name="geo.placename" content="Bangladesh" />
      
      {/* Author and Publisher */}
      <meta name="author" content={author} />
      <meta name="publisher" content={siteName} />
      <meta name="copyright" content={siteName} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={post?.title} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="bn_BD" />
      
      {/* Article specific OG tags */}
      {type === 'article' && (
        <>
          <meta property="article:published_time" content={publishedTime} />
          <meta property="article:modified_time" content={modifiedTime} />
          <meta property="article:author" content={author} />
          <meta property="article:section" content={post?.category?.name} />
          <meta property="article:tag" content={keywords} />
        </>
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@smecube" />
      <meta name="twitter:creator" content="@smecube" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={post?.title} />
      
      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      {/* Mobile Meta Tags */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#DC2626" />
      <meta name="msapplication-TileColor" content="#DC2626" />
      
      {/* JSON-LD Schemas */}
      <script type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </script>
      
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      
      <script type="application/ld+json">
        {JSON.stringify(webPageSchema)}
      </script>
      
      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
      
      {howToSchema && (
        <script type="application/ld+json">
          {JSON.stringify(howToSchema)}
        </script>
      )}
      
      {relatedSchema && (
        <script type="application/ld+json">
          {JSON.stringify(relatedSchema)}
        </script>
      )}
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://images.unsplash.com" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://images.unsplash.com" />
    </Helmet>
  );
};

export default BlogSEO;