
import { SelectionModel } from "@angular/cdk/collections";
import { FlatTreeControl } from "@angular/cdk/tree";
import { Component, Injectable, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import {
  MatTreeFlatDataSource,
  MatTreeFlattener
} from "@angular/material/tree";
import { BehaviorSubject } from "rxjs";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

/**
 * Node for to-do text
 */


/** Flat to-do text node with expandable and level information */
export class FoodFlatNode {
  text: string;
  level: number;
  expandable: boolean;
}

/**
 * The Json object for to-do list data.
 */
const TREE_DATA: any[] = [
  {
    text: "Fruit",
    children: [
      { text: "Apple" },
      { text: "Banana" },
      {
        text: "Fruit loops",
        children: [
          { text: "Cherry" },
          { text: "Grapes", children: [{ text: "Oranges" }] }
        ]
      }
    ]
  },
  {
    text: "Vegetables",
    children: [
      {
        text: "Green",
        children: [{ text: "Broccoli" }, { text: "Brussels sprouts" }]
      },
      {
        text: "Orange",
        children: [{ text: "Pumpkins" }, { text: "Carrots" }]
      }
    ]
  }
];

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit ,OnChanges {

  @Input() categoryListData:any;
 
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<FoodFlatNode, any>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<any, FoodFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: FoodFlatNode | null = null;

  /** The new text's name */
  newtextName = "";

  treeControl: FlatTreeControl<FoodFlatNode>;

  treeFlattener: MatTreeFlattener<any, FoodFlatNode>;

  dataSource: MatTreeFlatDataSource<any, FoodFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<FoodFlatNode>(true /* multiple */);

  /// Filtering
  myControl = new FormControl();
  options: string[] = ["One", "Two", "Three"];
  filteredOptions: Observable<string[]>;

  constructor() {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren
    );
    this.treeControl = new FlatTreeControl<FoodFlatNode>(
      this.getLevel,
      this.isExpandable
    );
    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.categoryListData,'ssd');
    this.dataSource.data=this.categoryListData;
  }

  getLevel = (node: FoodFlatNode) => node.level;

  isExpandable = (node: FoodFlatNode) => node.expandable;

  getChildren = (node: any): any[] => node.children;

  hasChild = (_: number, _nodeData: FoodFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: FoodFlatNode) => _nodeData.text === "";

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: any, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.text === node.text
        ? existingNode
        : new FoodFlatNode();
    flatNode.text = node.text;
    flatNode.level = level;
    flatNode.expandable = !!node.children;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: FoodFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: FoodFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child =>
      this.checklistSelection.isSelected(child)
    );
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do text selection. Select/deselect all the descendants node */
  todotextSelectionToggle(node: FoodFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.every(child => this.checklistSelection.isSelected(child));
    this.checkAllParentsSelection(node);
  }

  /** Toggle a leaf to-do text selection. Check all the parents to see if they changed */
  todoLeaftextSelectionToggle(node: FoodFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: FoodFlatNode): void {
    let parent: FoodFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: FoodFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: FoodFlatNode): FoodFlatNode | null {
    console.log(this.checklistSelection.selected);
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  getSelectedtexts(): string {
    if (!this.checklistSelection.selected.length) return "Favorite Food";
    return this.checklistSelection.selected.map(s => s.text).join(",");
  }

  filterChanged(filterText: string) {
    console.log("filterChanged", filterText);
    // ChecklistDatabase.filter method which actually filters the tree and gives back a tree structure
    // this._database.filter(filterText);
    if (filterText) {
      this.treeControl.expandAll();
    } else {
      this.treeControl.collapseAll();
    }
  }
}
