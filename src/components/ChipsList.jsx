import { Wrap, WrapItem, Tag, TagLabel, TagCloseButton } from "@chakra-ui/react";
import PropTypes from "prop-types";

export default function ChipsList({ chips, selectedCategory, onCategoryClick }) {
  // Menghindari duplikasi kategori
  const uniqueCategories = Array.from(new Set(chips.map((chip) => chip.category)));

  return (
    <Wrap mt={4} spacing={3}>
      {uniqueCategories.map((category) => (
        <WrapItem key={category}>
          <Tag
            size="md"
            variant={selectedCategory === category ? "solid" : "subtle"}
            bg="#12175E"
            px={2}
            color="white"
            cursor="pointer"
            onClick={() => onCategoryClick(category)}
            _hover={{opacity: "75%"}}
          >
            <TagLabel>#{category}</TagLabel>
            {selectedCategory === category && (
              <TagCloseButton onClick={(e) => {
                e.stopPropagation(); // Mencegah pemicu onClick Tag utama
                onCategoryClick(null); // Reset filter
              }} />
            )}
          </Tag>
        </WrapItem>
      ))}
    </Wrap>
  );
}

ChipsList.propTypes = {
  chips: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedCategory: PropTypes.string,
  onCategoryClick: PropTypes.func.isRequired,
};
