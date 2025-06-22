import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectLoggedInUser,
  updateProfile,
} from "../redux/features/user/userSlice";
import { formatJoinedDate, formatLoginTime } from "../utils/formatDateTime";
import { MdEdit, MdCloudUpload, MdLink } from "react-icons/md";

const ProfilePage = () => {
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  const [edit, setEdit] = useState(false);
  const [avatarMode, setAvatarMode] = useState("url");
  const [preview, setPreview] = useState(user?.userImage || "");
  const [form, setForm] = useState({
    userFullName: user?.userFullName || "",
    gender: user?.gender || "",
    dob: user?.dob || "",
    mobile: user?.mobileNo || "",
    address: user?.address || "",
    userImage: user?.userImage || "",
  });

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center text-xl">
        Log in to view your profile
      </div>
    );
  }

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    setForm({ ...form, userImage: url });
  };

  const save = () => {
    dispatch(updateProfile({ id: user.id, ...form }));
    setEdit(false);
  };

  return (
    <section className="max-w-5xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center text-[#2A454E]">
        Your Profile
      </h1>

      <div className="bg-white shadow-md border border-gray-200 rounded-2xl p-8 flex flex-col md:flex-row gap-8">
        <div className="flex flex-col items-center md:w-1/3">
          <div className="relative group">
            <img
              src={preview}
              alt="avatar"
              className="w-40 h-40 rounded-full object-cover border-4 border-[#FFC801]/40"
            />
            {edit && (
              <>
                <label
                  htmlFor="avatar-device"
                  className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition"
                >
                  <MdEdit className="text-white text-3xl" />
                </label>
                <input
                  id="avatar-device"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFile}
                />
              </>
            )}
          </div>

          {!edit && (
            <button
              onClick={() => setEdit(true)}
              className="mt-4 px-4 py-1 rounded-full bg-[#2A454E] text-[#FFC801] font-semibold cursor-pointer"
            >
              Edit Profile
            </button>
          )}
        </div>

        <div className="flex-1 space-y-4">
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-slate-700 text-sm">
            <Info label="Name" value={user.userFullName} />
            <Info label="Email" value={user.userEmail} />
            <Info label="Joined" value={formatJoinedDate(user.joinedOn)} />
            <Info
              label="Last login"
              value={user.loginTime ? formatLoginTime(user.loginTime) : "—"}
            />
            <Info label="Gender" value={user.gender || "—"} />
            <Info label="Date Of Birth" value={user.dob || "—"} />
            <Info label="Mobile No." value={user.mobile || "—"} />
            <Info label="Address" value={user.address || "—"} />
          </div>

          {edit && (
            <div className="pt-6 border-t space-y-6">
              <div className="flex gap-4">
                <TabButton
                  label="Upload"
                  icon={<MdCloudUpload />}
                  active={avatarMode === "device"}
                  onClick={() => setAvatarMode("device")}
                />
                <TabButton
                  label="Paste URL"
                  icon={<MdLink />}
                  active={avatarMode === "url"}
                  onClick={() => setAvatarMode("url")}
                />
              </div>

              {avatarMode === "device" ? (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                  className="w-full border rounded p-2"
                />
              ) : (
                <input
                  type="url"
                  name="userImage"
                  value={form.userImage}
                  onChange={handleChange}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full border rounded p-2"
                />
              )}

              <div className="grid sm:grid-cols-2 gap-6">
                <Input
                  name="userFullName"
                  label="Full name"
                  value={form.userFullName}
                  onChange={handleChange}
                />
                <Input
                  name="gender"
                  label="Gender"
                  value={form.gender}
                  onChange={handleChange}
                />
                <Input
                  name="dob"
                  type="date"
                  label="Date of Birth"
                  value={form.dob}
                  onChange={handleChange}
                />
                <Input
                  name="mobile"
                  label="Mobile"
                  value={form.mobile}
                  onChange={handleChange}
                />
              </div>

              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Address"
                className="w-full border rounded p-2 h-24"
              />

              <div className="flex gap-4">
                <button
                  onClick={save}
                  className="flex-1 bg-green-600 text-white py-2 rounded cursor-pointer"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEdit(false);
                    setAvatarMode("url");
                    setPreview(user.userImage);
                    setForm({
                      userFullName: user.userFullName || "",
                      gender: user.gender || "",
                      dob: user.dob || "",
                      mobile: user.mobile || "",
                      address: user.address || "",
                      userImage: user.userImage || "",
                    });
                  }}
                  className="flex-1 bg-gray-300 py-2 rounded cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white shadow-md  border border-gray-200 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Recent logins</h2>
        {user.loginHistory.length ? (
          <ul className="flex flex-wrap gap-3">
            {user.loginHistory.map((t, i) => (
              <li
                key={i}
                className="bg-indigo-50 px-3 py-1 rounded-full text-sm text-slate-700"
              >
                {formatLoginTime(t)}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-500">No login history yet.</p>
        )}
      </div>
    </section>
  );
};

const Info = ({ label, value }) => (
  <p>
    <span className="font-medium">{label} - </span>
    {value}
  </p>
);

const Input = ({ label, ...props }) => (
  <div className="flex flex-col">
    <label className="text-sm font-medium mb-1">{label}</label>
    <input
      {...props}
      className="border rounded p-2 focus:ring-2 ring-indigo-300"
    />
  </div>
);

const TabButton = ({ label, icon, active, ...rest }) => (
  <button
    {...rest}
    className={`flex cursor-pointer items-center gap-1 px-3 py-1 rounded-full text-sm font-medium shadow ${
      active ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"
    }`}
  >
    {" "}
    {icon} {label}
  </button>
);

export default ProfilePage;
