import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { BookFrontMatter, PostFrontMatter, PostFrontMatterResponse } from "./types";

export default function useTags(posts: (PostFrontMatter|BookFrontMatter)[]) {
  const router = useRouter()
  const [activeTags, setActiveTags] = useState<string[]>(getTagsFromQuery());
  const [filtered, setFiltered] = useState(posts);

  function getTagsFromQuery() {
    if (typeof window === "undefined") return [];

    const query = (new URL(window.location.href)).searchParams.get("tags");
    if (query) {
      return query.split(",");
    }

    return []
  };

  const allTags = posts.reduce((tags, post) => {
    if (!post.tags) return tags;
    
    const newTags = [...tags];
    post.tags.forEach(tag => {
      if (!tags.find(t => t.slug === tag.slug)) {
        newTags.push(tag);
      }
    })

    return newTags;
  }, [])

  const allTypes = posts.reduce((types, post) => {
    if (!post.type) return types;

    if (!types.find(type => type === post.type)) {
      types.push(post.type);
    }
    
    return types;
  }, [])

  function isTagActive(tagName: string) {
    return activeTags.includes(tagName)
  }

  const isPostActive = useCallback((post: PostFrontMatter|BookFrontMatter) => {
    if (activeTags.length === 0) return true;

    return !!(
      post.tags?.find(tag => activeTags.includes(tag.slug)) ||
      activeTags.includes(post.type)
    );
  }, [activeTags])

  function toggleTag(tagName: string) {
    isTagActive(tagName) ? removeTag(tagName) : addTag(tagName)
  }

  function addTag(tagName: string) {
    setActiveTags([...activeTags, tagName]);
  }

  function removeTag(tagName: string) {
    const newTags = activeTags.filter(t => t !== tagName);
    setActiveTags(newTags);
  }

  useEffect(() => {
    if (activeTags.length === 0) {
      setFiltered(posts)
      return;
    }

    const newPosts = posts.filter(isPostActive);
    setFiltered(newPosts)
  }, [posts, activeTags, isPostActive])

  useEffect(() => {
    let query = "";
    if (activeTags.length) {
      query = `?tags=${activeTags.join(",")}`;
    };

    router.replace(window.location.pathname + query);
  }, [activeTags])

  return {
    tags: allTags,
    types: allTypes,
    isTagActive,
    isPostActive,
    toggleTag,
    filtered
  };
}