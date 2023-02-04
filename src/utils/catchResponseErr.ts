export default (err: any) => {
  return err?.response?.data?.error?.message?.toString() || "Алдаа гарлаа";
};
