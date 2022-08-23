
import { Button, styled } from "@mui/material";

export const CustomAppBarButton = styled(Button)`
  color: ${({ theme }) => theme.palette.secondary.main};
  border: 2px solid ${({ theme }) => theme.palette.secondary.dark};
  border-radius: 10px;
  width: 200px;
  font-size: 1.7em;
  margin: 1em;
  display: 'block';
  &:hover {
    color: white;
    border: 2px solid ${({ theme }) => theme.palette.secondary.light};
    background-color: ${({ theme }) => theme.palette.secondary.light};
    opacity: 0.6;
  }
  &:active {
    color: white;
    border: 2px solid ${({ theme }) => theme.palette.secondary.main};
    background-color: ${({ theme }) => theme.palette.secondary.main};
    opacity: 0.2;
  }
`;