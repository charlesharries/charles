import { useEffect, useState } from "react";
import { Post, Tag } from "./types";


export default function useTags(posts: Post[]) {
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [filtered, setFiltered] = useState(posts);

  const allTags = posts.reduce((tags, post) => {
    const newTags = [...tags];
    post.tags.forEach(tag => {
      if (!tags.find(t => t.slug == tag.slug)) {
        newTags.push(tag);
      }
    })

    return newTags;
  }, [])

  function isTagActive(tag) {
    return activeTags.includes(tag.slug)
  }

  function toggleTag(tag: Tag) {
    isTagActive(tag) ? removeTag(tag) : addTag(tag)
  }

  function addTag(tag: Tag) {
    setActiveTags([...activeTags, tag.slug]);
  }

  function removeTag(tag: Tag) {
    const newTags = activeTags.filter(t => t !== tag.slug);
    setActiveTags(newTags);
  }

  console.log({ activeTags });

  useEffect(() => {
    if (activeTags.length === 0) {
      setFiltered(posts)
      return;
    }

    const newPosts = posts.filter(p => p.tags.find(t => activeTags.includes(t.slug)));
    setFiltered(newPosts)
  }, [posts, activeTags])

  return { tags: allTags, isTagActive, toggleTag, filtered };
}