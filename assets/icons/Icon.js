import Ionicons from '@expo/vector-icons/Ionicons';
import Materialicons from '@expo/vector-icons/MaterialIcons';
import { COLORS, SHADOWS } from '../../constants';

export const SearchIcon = ({ size, color }) => {
  return <Ionicons name='search' size={size} color={color} />;
};
export const SearchOutlineIcon = ({ size, color }) => {
  return <Ionicons name='search-outline' size={size} color={color} />;
};

export const EyeIcon = ({ size, color }) => {
  return <Ionicons name='eye' size={size} color={color} />;
};

export const ClosedEyeIcon = ({ size, color }) => {
  return <Ionicons name='eye-off' size={size} color={color} />;
};

export const HeartIcon = ({ size, color, style }) => {
  return <Ionicons name='heart' size={size} color={color} style={style} />;
};

export const HeartOutlineIcon = ({ size, color, style }) => {
  return (
    <Ionicons name='heart-outline' size={size} color={color} style={style} />
  );
};

export const HomeIcon = ({ size, color, style }) => {
  return <Ionicons name='home' size={size} color={color} style={style} />;
};
export const HomeOutlineIcon = ({ size, color, style }) => {
  return (
    <Ionicons name='home-outline' size={size} color={color} style={style} />
  );
};
export const ProfileIcon = ({ size, color, style }) => {
  return <Ionicons name='person' size={size} color={color} style={style} />;
};
export const ProfileOutlineIcon = ({ size, color, style }) => {
  return (
    <Ionicons name='person-outline' size={size} color={color} style={style} />
  );
};
export const PlusIcon = ({ size, color, style }) => {
  return <Ionicons name='add' size={size} color={color} style={style} />;
};
export const PlusOutlineIcon = ({ size, color, style }) => {
  return (
    <Ionicons name='add-outline' size={size} color={color} style={style} />
  );
};
export const FilterIcon = ({ size, color, style }) => {
  return <Ionicons name='filter' size={size} color={color} style={style} />;
};
export const CloseIcon = ({ size, color, style }) => {
  return <Ionicons name='close' size={size} color={color} style={style} />;
};

export const GoBackIcon = ({ style, size, color }) => {
  return (
    <Ionicons name='chevron-back' size={size} color={color} style={style} />
  );
};

export const NoAlcohol = ({ style, size, color }) => {
  return (
    <Materialicons name='no-drink' size={size} color={color} style={style} />
  );
};
export const Alcohol = ({ style, size, color }) => {
  return (
    <Materialicons name='local-bar' size={size} color={color} style={style} />
  );
};

export const SettingsOutline = ({ style, size, color }) => {
  return (
    <Ionicons name='settings-outline' style={style} size={size} color={color} />
  );
};

export const Settings = ({ style, size, color }) => {
  return <Ionicons name='settings' style={style} size={size} color={color} />;
};
export const Logout = ({ style, size, color }) => {
  return (
    <Ionicons name='log-out-outline' style={style} size={size} color={color} />
  );
};
export const Alert = ({ style, size, color }) => {
  return (
    <Ionicons
      name='alert-circle-outline'
      style={style}
      size={size}
      color={color}
    />
  );
};
export const ChangePassword = ({ style, size, color }) => {
  return (
    <Ionicons
      name='key-outline'
      //name='lock-open-outline'
      style={style}
      size={size}
      color={color}
    />
  );
};
export const SuggestDrink = ({ style, size, color }) => {
  return (
    <Ionicons name='mail-outline' style={style} size={size} color={color} />
  );
};
export const DeleteAccount = ({ style, size, color }) => {
  return (
    <Ionicons name='skull-outline' style={style} size={size} color={color} />
  );
};
export const Close = ({ style, size, color }) => {
  return (
    <Ionicons name='close-outline' style={style} size={size} color={color} />
  );
};
export const Filter = ({ style, size, color }) => {
  return (
    <Ionicons name='options-outline' style={style} size={size} color={color} />
  );
};

export const RemoveIcon = ({ size, color }) => {
  return <Ionicons name='remove-circle' size={size} color={color} />;
};
