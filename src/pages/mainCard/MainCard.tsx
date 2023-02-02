import { Menu } from "@webmens-ru/ui_lib";
import { useSetTabsMutation } from "../main";
import { useMenuData } from "../main/hooks/useMenuData";
import { MainCardContainer, MainCardHeader, MainCardHeaderActions, MainCardHeaderTitle } from "./styles";

interface MainCardProps {
  menuId?: number;
}

export const MainCard = ({ menuId = 1 }: MainCardProps) => {
  const { tabs, setTab } = useMenuData(menuId);
  const [itemsMutation] = useSetTabsMutation();

  return (
    <MainCardContainer>
      <MainCardHeader>
        <MainCardHeaderTitle children="Test" />
        <MainCardHeaderActions>

        </MainCardHeaderActions>
      </MainCardHeader>
      <Menu
        menuStyle="card" 
        items={tabs.data}
        setItem={setTab}
        itemsMutation={itemsMutation}
      />
      
    </MainCardContainer>
  )
}
