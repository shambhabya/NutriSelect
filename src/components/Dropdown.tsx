"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, X } from "lucide-react";

interface Item {
  value: string;
  label: string;
}

export default function Dropdown() {
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: Item }>(
    {}
  );

  const handleItemSelect = (item: Item) => {
    setSelectedItems((prevState) => ({
      ...prevState,
      [item.value]: item,
    }));
  };

  const handleItemDeselect = (item: Item) => {
    const newSelectedItems = { ...selectedItems };
    delete newSelectedItems[item.value];
    setSelectedItems(newSelectedItems);
  };

  return (
    <div className="relative">
      <div className="flex flex-wrap gap-2 mb-2">
        {Object.values(selectedItems).map((item) => (
          <div
            key={item.value}
            className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full flex items-center gap-2"
          >
            <span>{item.label}</span>
            <button
              type="button"
              className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-50"
              onClick={() => handleItemDeselect(item)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            <span>
              {Object.keys(selectedItems).length
                ? "Selected items"
                : "Select items"}
            </span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[300px]">
          {["item1", "item2", "item3", "item4"].map((itemValue) => (
            <DropdownMenuCheckboxItem
              key={itemValue}
              checked={!!selectedItems[itemValue]}
              onCheckedChange={(checked) =>
                checked
                  ? handleItemSelect({
                      value: itemValue,
                      label: `Item ${itemValue.slice(-1)}`,
                    })
                  : handleItemDeselect({
                      value: itemValue,
                      label: `Item ${itemValue.slice(-1)}`,
                    })
              }
            >
              {`Item ${itemValue.slice(-1)}`}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
