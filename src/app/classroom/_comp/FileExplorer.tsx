"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Folder, File, ChevronRight, ChevronDown } from "lucide-react";
import { FileTreeItem } from "@/types";

function FileExplorer({
  activeFile,
  setActiveFile,
  fileTree
}: {
  activeFile: string;
  setActiveFile: Dispatch<SetStateAction<string>>;
  fileTree: FileTreeItem[]
}) {
  return (
    <TreeView
    nodes={fileTree}
    level={0}
    activeFile={activeFile}
    setActiveFile={setActiveFile}
    parentPath="" // Start with an empty parent path
  />
  );
}

function TreeView({
  nodes,
  level,
  activeFile,
  setActiveFile,
  parentPath,
}: {
  nodes: any[];
  level: number;
  activeFile: string | null;
  setActiveFile: (filePath: string) => void;
  parentPath: string; // Track the parent path
}) {
  return (
    <div>
      {nodes.map((node) => (
        <TreeNode
          key={node.name}
          node={node}
          level={level}
          activeFile={activeFile}
          setActiveFile={setActiveFile}
          parentPath={parentPath} // Pass the parent path
        />
      ))}
    </div>
  );
}

function TreeNode({
  node,
  level,
  activeFile,
  setActiveFile,
  parentPath,
}: {
  node: any;
  level: number;
  activeFile: string | null;
  setActiveFile: (filePath: string) => void;
  parentPath: string; // Track the parent path
}) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    const currentPath = `${parentPath}/${node.name}`; // Build the full path
    if (node.type === "file") {
      setActiveFile(currentPath); // Save the full path of the active file
    } else if (node.type === "folder") {
      setOpen(!open); // Toggle folder open state
    }
  };

  return (
    <div>
      <div
        className={`flex items-center cursor-pointer p-1 hover:bg-gray-700 rounded-md ${
          activeFile === `${parentPath}/${node.name}` ? "bg-gray-600" : ""
        }`}
        onClick={handleClick}
        style={{ paddingLeft: `${level * 16}px` }}
      >
        {node.type === "folder" ? (
          <>
            {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            <Folder className="ml-1 mr-2 text-yellow-400" size={16} />
          </>
        ) : (
          <File className="mr-2 text-blue-400" size={16} />
        )}
        {node.name}
      </div>
      {open && node.children && (
        <TreeView
          nodes={node.children}
          level={level + 1}
          activeFile={activeFile}
          setActiveFile={setActiveFile}
          parentPath={`${parentPath}/${node.name}`} // Pass the updated parent path
        />
      )}
    </div>
  );
}

export default FileExplorer;
