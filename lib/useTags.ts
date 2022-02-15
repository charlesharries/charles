import { useCallback, useEffect, useState } from "react";
import { Post, PostFrontMatter, Tag } from "./types";


export default function useTags(posts: Post[]) {
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [filtered, setFiltered] = useState(posts);

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

  const isPostActive = useCallback((post: PostFrontMatter) => {
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

  console.log({ allTypes });

  return {
    tags: allTags,
    types: allTypes,
    isTagActive,
    isPostActive,
    toggleTag,
    filtered
  };
}