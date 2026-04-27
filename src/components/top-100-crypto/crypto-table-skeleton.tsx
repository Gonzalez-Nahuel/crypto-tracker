export const CryptoTableSkeleton = () => {
  return Array.from({ length: 20 }).map((_, i) => (
    <tr key={i} className="animate-pulse h-12 border-b">
      <td>
        <div className="w-4 h-4 bg-gray-300 rounded" />
      </td>
      <td>
        <div className="w-6 h-4 bg-gray-300 rounded" />
      </td>
      <td>
        <div className="w-32 h-4 bg-gray-300 rounded" />
      </td>
      <td>
        <div className="w-20 h-4 bg-gray-300 rounded" />
      </td>
      <td>
        <div className="w-16 h-4 bg-gray-300 rounded" />
      </td>
    </tr>
  ));
};
